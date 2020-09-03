import { makeIconListJson, makeIconSvgWithDesc } from "./Saver";

describe("Saver", () => {
    test("makeIconSvgWithDesc", () => {
        const json = makeIconListJson([
            {
                svg(): string {
                    return "<svg xmlns:tactic=\"http://tactic.foo\" xmlns=\"http://www.w3.org/2000/svg\"><g/></svg>";
                },
                meta: {
                    defaultAngle: -1,
                    group: "foo",
                    id: "bar",
                    keuz: "baz",
                    name: "some-name",
                    rotationType: "flip"
                }
            },

            {
                svg(): string {
                    return "<svg xmlns:tactic=\"http://tactic.foo\" xmlns=\"http://www.w3.org/2000/svg\"><g/></svg>";
                },
                meta: {
                    defaultAngle: -1,
                    group: "foo",
                    id: "bbb",
                    keuz: "baz",
                    name: "some-name",
                    rotationType: "flip"
                }
            }
        ]);

        expect(json).toEqual(
            "[\n    \"<svg xmlns:tactic=\\\"http://tactic.foo\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><g/><desc><tactic:name>some-name</tactic:name><tactic:group>foo</tactic:group><tactic:angle>-1</tactic:angle><tactic:rotation>flip</tactic:rotation><tactic:id>bar</tactic:id><tactic:keuz>baz</tactic:keuz></desc></svg>\",\n" +
            "    \"<svg xmlns:tactic=\\\"http://tactic.foo\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><g/><desc><tactic:name>some-name</tactic:name><tactic:group>foo</tactic:group><tactic:angle>-1</tactic:angle><tactic:rotation>flip</tactic:rotation><tactic:id>bbb</tactic:id><tactic:keuz>baz</tactic:keuz></desc></svg>\"\n" +
            "]"
        );
    });
});
