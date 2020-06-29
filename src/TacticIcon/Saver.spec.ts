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
            "[\n    \"<svg xmlns:tactic=\\\"http://tactic.foo\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><g></g><desc xmlns:tactic=\\\"http://tactic.foo\\\"><name>some-name</name><group>foo</group><angle>-1</angle><rotation>flip</rotation><id>bar</id><keuz>baz</keuz></desc></svg>\",\n" +
            "    \"<svg xmlns:tactic=\\\"http://tactic.foo\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><g></g><desc xmlns:tactic=\\\"http://tactic.foo\\\"><name>some-name</name><group>foo</group><angle>-1</angle><rotation>flip</rotation><id>bbb</id><keuz>baz</keuz></desc></svg>\"\n" +
            "]"
        );
    });
});
