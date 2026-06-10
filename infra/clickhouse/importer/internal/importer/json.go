package importer

import (
	"encoding/json"
	"io"
)

// WriteResultJSON grava o Result como JSON indentado (sidecar do log p/ automação).
func WriteResultJSON(w io.Writer, res *Result) error {
	enc := json.NewEncoder(w)
	enc.SetIndent("", "  ")
	return enc.Encode(res)
}
