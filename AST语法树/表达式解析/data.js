const astTree1 = {
  type: "File",
  start: 0,
  end: 38,
  loc: {
    start: { line: 1, column: 0, index: 0 },
    end: { line: 3, column: 1, index: 38 },
  },
  errors: [],
  program: {
    type: "Program",
    start: 0,
    end: 38,
    loc: {
      start: { line: 1, column: 0, index: 0 },
      end: { line: 3, column: 1, index: 38 },
    },
    sourceType: "script",
    interpreter: null,
    body: [
      {
        type: "FunctionDeclaration",
        start: 0,
        end: 38,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 3, column: 1, index: 38 },
        },
        id: {
          type: "Identifier",
          start: 9,
          end: 15,
          loc: {
            start: { line: 1, column: 9, index: 9 },
            end: { line: 1, column: 15, index: 15 },
            identifierName: "square",
          },
          name: "square",
        },
        generator: false,
        async: false,
        params: [
          {
            type: "Identifier",
            start: 16,
            end: 17,
            loc: {
              start: { line: 1, column: 16, index: 16 },
              end: { line: 1, column: 17, index: 17 },
              identifierName: "n",
            },
            name: "n",
          },
        ],
        body: {
          type: "BlockStatement",
          start: 19,
          end: 38,
          loc: {
            start: { line: 1, column: 19, index: 19 },
            end: { line: 3, column: 1, index: 38 },
          },
          body: [
            {
              type: "ReturnStatement",
              start: 23,
              end: 36,
              loc: {
                start: { line: 2, column: 2, index: 23 },
                end: { line: 2, column: 15, index: 36 },
              },
              argument: {
                type: "BinaryExpression",
                start: 30,
                end: 35,
                loc: {
                  start: { line: 2, column: 9, index: 30 },
                  end: { line: 2, column: 14, index: 35 },
                },
                left: {
                  type: "Identifier",
                  start: 30,
                  end: 31,
                  loc: {
                    start: { line: 2, column: 9, index: 30 },
                    end: { line: 2, column: 10, index: 31 },
                    identifierName: "n",
                  },
                  name: "n",
                },
                operator: "*",
                right: {
                  type: "Identifier",
                  start: 34,
                  end: 35,
                  loc: {
                    start: { line: 2, column: 13, index: 34 },
                    end: { line: 2, column: 14, index: 35 },
                    identifierName: "n",
                  },
                  name: "n",
                },
              },
            },
          ],
          directives: [],
        },
      },
    ],
    directives: [],
  },
  comments: [],
};
