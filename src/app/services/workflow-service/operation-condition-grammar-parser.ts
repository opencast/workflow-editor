// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

interface NearleyToken {  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: NearleyToken) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    {"name": "EXPRESSION", "symbols": ["TERM"], "postprocess":
        (d) => {
          function flattenDeep(params) {
            return params.reduce(
              (acc, val) =>
                (Array.isArray(val) && (typeof val !== 'string')) ? acc.concat(flattenDeep(val)) : acc.concat(val),
              []);
          }
          return {
            type:   'TERM',
            d:      (d[0].d)? d[0].d : d[0],
            ...(typeof (d[0].p) !== 'undefined') && {p: Array.from(new Set(flattenDeep([d[0].p])))},
            //bf:     d[0].bf,
            v:      d[0].v
          }
        }
    },
    {"name": "EXPRESSION$string$1", "symbols": [{"literal":"O"}, {"literal":"R"}], "postprocess": (d) => d.join('')},
    {"name": "EXPRESSION", "symbols": ["TERM", "_", "EXPRESSION$string$1", "_", "EXPRESSION"], "postprocess":
        (d) => {
          function flattenDeep(params) {
            return params.reduce(
              (acc, val) =>
                (Array.isArray(val) && (typeof val !== 'string')) ? acc.concat(flattenDeep(val)) : acc.concat(val),
              []);
          }
          return {
            type:   'OR',
            dl:     (d[0].d)? d[0].d : d[0],
            dr:     (d[4].d)? d[4].d : d[4],
            ...((typeof (d[0].p) !== 'undefined' || typeof (d[4].p) !== 'undefined')) && {p: (d[0].p && d[4].p)? flattenDeep(Array.from(new Set([d[0].p,d[4].p]))) : (d[0].p)? Array.from(new Set(flattenDeep([d[0].p]))) : Array.from(new Set(flattenDeep([d[4].p])))},
            //bf:     d[0].bf.map(x => d[4].bf.map(y => x || y)).flat(),
            left:   d[0].v,
            right:  d[4].v,
            v:      d[0].v + " " + d[2] + " " + d[4].v
          }
        }
    },
    {"name": "TERM", "symbols": ["VALUE"], "postprocess":
        (d) => {
          return {
            type:   'VALUE',
            d:      (d[0].d)? d[0].d : d[0],
            ...(typeof (d[0].p) !== 'undefined') && {p: d[0].p},
            //bf:     d[0].bf,
            v:      d[0].v
          }
        }
    },
    {"name": "TERM$string$1", "symbols": [{"literal":"A"}, {"literal":"N"}, {"literal":"D"}], "postprocess": (d) => d.join('')},
    {"name": "TERM", "symbols": ["VALUE", "_", "TERM$string$1", "_", "TERM"], "postprocess":
        (d) => {
          return {
            type:   'AND',
            dl:     (d[0].d)? d[0].d : d[0],
            dr:     (d[4].d)? d[4].d : d[4],
            ...((typeof (d[0].p) !== 'undefined' || typeof (d[4].p) !== 'undefined')) && {p: (d[0].p && d[4].p)? [d[0].p, d[4].p] : (d[0].p)? d[0].p : d[4].p},
            //bf:     d[0].bf.map(x => d[4].bf.map(y => x && y)).flat(),
            left:   d[0].v,
            right:  d[4].v,
            v:      d[0].v + " " + d[2] + " " + d[4].v
          }
        }
    },
    {"name": "VALUE", "symbols": ["RELATION"], "postprocess":
        (d) => {
          return {
            type:   'RELATIONVALUE',
            d:      d[0],
            ...(typeof (d[0].p) !== 'undefined') && {p: d[0].p},
            //bf:     [0, 1],
            v:      d[0].v
          }
        }
    },
    {"name": "VALUE", "symbols": ["BOOLLITERAL"], "postprocess":
        (d) => {
          return {
            type:   'BOOLLITERALVALUE',
            d:      d[0],
            //bf:     d[0].bf,
            v:      d[0].v
          }
        }
    },
    {"name": "VALUE", "symbols": [{"literal":"("}, "_", "EXPRESSION", "_", {"literal":")"}], "postprocess":
        (d) => {
          return {
            type:   'NESTED',
            dp:      d[2].d,
            ...(typeof (d[2].p) !== 'undefined') && {p: d[2].p},
            //bf:     d[2].bf,
            v:      d[0] + ((d[1])? d[1]: "") + d[2].v + ((d[3])? d[3]: "") + d[4]
          }
        }
    },
    {"name": "VALUE$string$1", "symbols": [{"literal":"N"}, {"literal":"O"}, {"literal":"T"}], "postprocess": (d) => d.join('')},
    {"name": "VALUE", "symbols": ["VALUE$string$1", "_", {"literal":"("}, "_", "EXPRESSION", "_", {"literal":")"}], "postprocess":
        (d) => {
          return {
            type:   'NOT',
            dn:     (d[4].d)? d[4].d : d[4],
            ...(typeof (d[4].p) !== 'undefined') && {p: d[4].p},
            //bf:     [d[4].bf].map(x => !x? 1 : 0),
            v:      d[0] + ((d[1])? d[1]: "") + d[2] + ((d[3])? d[3]: "") + d[4].v + ((d[5])? d[5]: "") + d[6]
          }
        }
    },
    {"name": "VALUE", "symbols": ["VARIABLE"], "postprocess":
        (d) => {
          return {
            type:   'VARIABLE',
            d:      d[0],
            p:      d[0].v,
            //bf:     [0, 1],
            v:      d[0].v
          }
        }
    },
    {"name": "RELATION", "symbols": ["RELATIONFACTOR", "_", "RELLITERAL", "_", "RELATIONFACTOR"], "postprocess":
        (d) => {
          return {
            type:   'RELATION',
            d:      d,
            ...((typeof (d[0].p) !== 'undefined' || typeof (d[4].p) !== 'undefined')) && {p: (d[0].p && d[4].p)? [d[0].p, d[4].p] : (d[0].p)? d[0].p : d[4].p},
            v:      d[0].v + ((d[1])? d[1] : "") + d[2].v + ((d[3])? d[3] : "") + d[4].v
          }
        }
    },
    {"name": "RELATIONFACTOR", "symbols": ["OPERATION"], "postprocess":
        (d) => {
          return {
            type:   'RELATIONFACTOR',
            d:      d,
            ...(typeof (d[0].p) !== 'undefined') && {p: d[0].p},
            v:      d[0].v
          }
        }
    },
    {"name": "RELATIONFACTOR", "symbols": ["ATOM"], "postprocess":
        (d) => {
          return {
            type:   'RELATIONFACTOR',
            d:      d,
            ...(typeof (d[0].p) !== 'undefined') && {p: d[0].p},
            v:      d[0].v
          }
        }
    },
    {"name": "OPERATION", "symbols": ["ATOM", "_", "OPLITERAL", "_", "ATOM"], "postprocess":
        (d) => {
          return {
            type:   'OPERATION',
            d:      d,
            ...((typeof (d[0].p) !== 'undefined' || typeof (d[4].p) !== 'undefined')) && {p: (d[0].p && d[4].p)? [d[0].p, d[4].p] : (d[0].p)? d[0].p : d[4].p},
            v:      d[0].v + ((d[1])? d[1]: "") + d[2].v + ((d[3])? d[3]: "") + d[4].v
          }
        }
    },
    {"name": "RELLITERAL$string$1", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": (d) => d.join('')},
    {"name": "RELLITERAL", "symbols": ["RELLITERAL$string$1"], "postprocess": (d) => {return {type:'RELLITERAL', d:d, v:d[0]}}},
    {"name": "RELLITERAL$string$2", "symbols": [{"literal":">"}], "postprocess": (d) => d.join('')},
    {"name": "RELLITERAL", "symbols": ["RELLITERAL$string$2"], "postprocess": (d) => {return {type:'RELLITERAL', d:d, v:d[0]}}},
    {"name": "RELLITERAL$string$3", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": (d) => d.join('')},
    {"name": "RELLITERAL", "symbols": ["RELLITERAL$string$3"], "postprocess": (d) => {return {type:'RELLITERAL', d:d, v:d[0]}}},
    {"name": "RELLITERAL$string$4", "symbols": [{"literal":"<"}], "postprocess": (d) => d.join('')},
    {"name": "RELLITERAL", "symbols": ["RELLITERAL$string$4"], "postprocess": (d) => {return {type:'RELLITERAL', d:d, v:d[0]}}},
    {"name": "RELLITERAL$string$5", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": (d) => d.join('')},
    {"name": "RELLITERAL", "symbols": ["RELLITERAL$string$5"], "postprocess": (d) => {return {type:'RELLITERAL', d:d, v:d[0]}}},
    {"name": "RELLITERAL$string$6", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": (d) => d.join('')},
    {"name": "RELLITERAL", "symbols": ["RELLITERAL$string$6"], "postprocess": (d) => {return {type:'RELLITERAL', d:d, v:d[0]}}},
    {"name": "OPLITERAL", "symbols": [{"literal":"+"}], "postprocess": (d) => {return {type:'OPLITERAL', d:d, v:d[0]}}},
    {"name": "OPLITERAL", "symbols": [{"literal":"-"}], "postprocess": (d) => {return {type:'OPLITERAL', d:d, v:d[0]}}},
    {"name": "OPLITERAL", "symbols": [{"literal":"*"}], "postprocess": (d) => {return {type:'OPLITERAL', d:d, v:d[0]}}},
    {"name": "OPLITERAL", "symbols": [{"literal":"/"}], "postprocess": (d) => {return {type:'OPLITERAL', d:d, v:d[0]}}},
    {"name": "BOOLLITERAL$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": (d) => d.join('')},
    {"name": "BOOLLITERAL", "symbols": ["BOOLLITERAL$string$1"], "postprocess": (d) => {return {type:'BOOLLITERAL', d:d, /*bf: 1,*/ v:d[0]}}},
    {"name": "BOOLLITERAL$string$2", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": (d) => d.join('')},
    {"name": "BOOLLITERAL", "symbols": ["BOOLLITERAL$string$2"], "postprocess": (d) => {return {type:'BOOLLITERAL', d:d, /*bf: 0,*/ v:d[0]}}},
    {"name": "ATOM", "symbols": ["NUMBER"], "postprocess": (d) => {return {type:'ATOM', d:d, v:d[0].v}}},
    {"name": "ATOM", "symbols": ["STRING"], "postprocess": (d) => {return {type:'ATOM', d:d, v:d[0].v}}},
    {"name": "ATOM", "symbols": ["VARIABLE"], "postprocess": (d) => {return {type:'ATOM', d:d, v:d[0].v, p:d[0].v}}},
    {"name": "VARIABLE$string$1", "symbols": [{"literal":"$"}, {"literal":"{"}], "postprocess": (d) => d.join('')},
    {"name": "VARIABLE$ebnf$1", "symbols": [/[a-zA-Z0-9!#%\-\+\*()_,.;:\\\[\]@]/]},
    {"name": "VARIABLE$ebnf$1", "symbols": ["VARIABLE$ebnf$1", /[a-zA-Z0-9!#%\-\+\*()_,.;:\\\[\]@]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "VARIABLE", "symbols": ["VARIABLE$string$1", "_", "VARIABLE$ebnf$1", "_", {"literal":"}"}], "postprocess":
        (d) => {
          return {
            type:   'VARIABLE',
            d:      d,
            v:      d[0] + ((d[1])? d[1]: "") + d[2].join("") + ((d[3])? d[3]: "") + d[4]
          }
        }
    },
    {"name": "NUMBER$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "NUMBER$ebnf$1", "symbols": ["NUMBER$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "NUMBER", "symbols": ["NUMBER$ebnf$1"], "postprocess": (d) => {return {type:'NUMBER', d:d, v: d[0].join("")}}},
    {"name": "NUMBER$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "NUMBER$ebnf$2", "symbols": ["NUMBER$ebnf$2", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "NUMBER$ebnf$3", "symbols": [/[0-9]/]},
    {"name": "NUMBER$ebnf$3", "symbols": ["NUMBER$ebnf$3", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "NUMBER", "symbols": ["NUMBER$ebnf$2", {"literal":"."}, "NUMBER$ebnf$3"], "postprocess":
        (d) => {return {type:'NUMBER', d:d, v: d[0].join("") + d[1] + d[2].join("")}} },
    {"name": "STRING$string$1", "symbols": [{"literal":"'"}], "postprocess": (d) => d.join('')},
    {"name": "STRING$ebnf$1", "symbols": []},
    {"name": "STRING$ebnf$1$subexpression$1", "symbols": [/[a-zA-Z0-9!#%\-\+\*()_,.;:\\\[\]@ ]/]},
    {"name": "STRING$ebnf$1", "symbols": ["STRING$ebnf$1", "STRING$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "STRING$string$2", "symbols": [{"literal":"'"}], "postprocess": (d) => d.join('')},
    {"name": "STRING", "symbols": ["STRING$string$1", "STRING$ebnf$1", "STRING$string$2"], "postprocess":
        (d) => {
          return {
            type:   'STRING',
            d:      d,
            v:      d[0] + d[1].join("") + d[2]
          }
        }
    },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null }}
  ],
  ParserStart: "EXPRESSION",
};

export default grammar;
