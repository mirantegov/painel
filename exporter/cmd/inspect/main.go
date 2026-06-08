package main

import (
	"fmt"
	"os"
	"sort"

	"github.com/parquet-go/parquet-go"
)

func main() {
	f, err := os.Open(os.Args[1])
	if err != nil {
		panic(err)
	}
	defer f.Close()
	st, _ := f.Stat()
	pf, err := parquet.OpenFile(f, st.Size())
	if err != nil {
		panic(err)
	}

	r := parquet.NewGenericReader[map[string]any](pf, pf.Schema())
	defer r.Close()
	rows := make([]map[string]any, pf.NumRows())
	for i := range rows {
		rows[i] = map[string]any{}
	}
	n, _ := r.Read(rows)
	fmt.Printf("linhas=%d colunas=%d\n", n, len(pf.Schema().Fields()))
	if n > 0 {
		keys := make([]string, 0, len(rows[0]))
		for k := range rows[0] {
			keys = append(keys, k)
		}
		sort.Strings(keys)
		fmt.Println("linha[0]:")
		for _, k := range keys {
			fmt.Printf("  %-18s %T = %v\n", k, rows[0][k], rows[0][k])
		}
		// procura uma linha com algum campo null (prova de NULL preservado)
		for _, row := range rows {
			for _, k := range keys {
				if row[k] == nil {
					fmt.Printf("null preservado: campo %q é nil em alguma linha\n", k)
					return
				}
			}
		}
	}
}
