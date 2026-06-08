package exporter

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/parquet-go/parquet-go"
)

// OIDs bem-conhecidos do Postgres. Tipos fora desta lista caem em "string"
// (raw fiel e lossless — o ClickHouse re-tipa no Épico 5).
const (
	oidBool        = 16
	oidInt8        = 20
	oidInt2        = 21
	oidInt4        = 23
	oidFloat4      = 700
	oidFloat8      = 701
	oidNumeric     = 1700
	oidUUID        = 2950
	oidJSON        = 114
	oidJSONB       = 3802
	oidDate        = 1082
	oidTimestamp   = 1114
	oidTimestamptz = 1184
)

// kind é o tipo-alvo no Parquet para uma coluna.
type kind int

const (
	kStr kind = iota
	kBool
	kI32
	kI64
	kF32
	kF64
)

// kindFor decide o tipo-alvo a partir do OID. numeric/uuid/temporais/json → string.
func kindFor(oid uint32) kind {
	switch oid {
	case oidBool:
		return kBool
	case oidInt2, oidInt4:
		return kI32
	case oidInt8:
		return kI64
	case oidFloat4:
		return kF32
	case oidFloat8:
		return kF64
	default:
		return kStr
	}
}

// nodeFor devolve o nó Parquet (sempre Optional — NULLs preservados).
func nodeFor(oid uint32) parquet.Node {
	var n parquet.Node
	switch kindFor(oid) {
	case kBool:
		n = parquet.Leaf(parquet.BooleanType)
	case kI32:
		n = parquet.Int(32)
	case kI64:
		n = parquet.Int(64)
	case kF32:
		n = parquet.Leaf(parquet.FloatType)
	case kF64:
		n = parquet.Leaf(parquet.DoubleType)
	default:
		n = parquet.String()
	}
	return parquet.Optional(n)
}

// convertValue normaliza o valor do pgx para o tipo exato do nó Parquet.
// nil permanece nil (null). Sem perda: numeric/uuid/temporais viram string.
func convertValue(oid uint32, v any) any {
	if v == nil {
		return nil
	}
	// Tipos pgtype com flag Valid: inválido = NULL preservado.
	switch x := v.(type) {
	case pgtype.Numeric:
		if !x.Valid {
			return nil
		}
	case pgtype.UUID:
		if !x.Valid {
			return nil
		}
	}
	switch kindFor(oid) {
	case kBool:
		if b, ok := v.(bool); ok {
			return b
		}
	case kI32:
		switch n := v.(type) {
		case int16:
			return int32(n)
		case int32:
			return n
		case int64:
			return int32(n)
		case int:
			return int32(n)
		}
	case kI64:
		switch n := v.(type) {
		case int64:
			return n
		case int32:
			return int64(n)
		case int16:
			return int64(n)
		case int:
			return int64(n)
		}
	case kF32:
		switch n := v.(type) {
		case float32:
			return n
		case float64:
			return float32(n)
		}
	case kF64:
		switch n := v.(type) {
		case float64:
			return n
		case float32:
			return float64(n)
		}
	}
	// kStr e fallbacks: representação textual lossless.
	return toString(v)
}

func toString(v any) string {
	switch x := v.(type) {
	case string:
		return x
	case []byte:
		return string(x)
	case [16]byte: // uuid cru
		return formatUUID(x)
	case pgtype.Numeric:
		return numericString(x)
	case pgtype.UUID:
		if x.Valid {
			return formatUUID(x.Bytes)
		}
		return ""
	case time.Time:
		// date → ISO; timestamp/tz → RFC3339 (lossless o suficiente p/ o raw).
		if x.Hour() == 0 && x.Minute() == 0 && x.Second() == 0 && x.Nanosecond() == 0 {
			return x.Format("2006-01-02")
		}
		return x.Format(time.RFC3339Nano)
	case fmt.Stringer:
		return x.String()
	case map[string]any, []any:
		if b, err := json.Marshal(x); err == nil {
			return string(b)
		}
	}
	return fmt.Sprintf("%v", v)
}

func formatUUID(b [16]byte) string {
	return fmt.Sprintf("%x-%x-%x-%x-%x", b[0:4], b[4:6], b[6:8], b[8:10], b[10:16])
}

// numericString devolve o valor decimal canônico de um numeric (lossless).
func numericString(n pgtype.Numeric) string {
	v, err := n.Value()
	if err != nil || v == nil {
		return ""
	}
	if s, ok := v.(string); ok {
		return s
	}
	return fmt.Sprintf("%v", v)
}
