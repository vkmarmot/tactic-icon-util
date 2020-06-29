import { parseJsonText, parseSVG } from "./Parser";

describe("functions", () => {
    test("parseSvg", () => {
        let parsed = parseSVG("<svg xmlns:tactic=\"http://tactic.foo\" xmlns=\"http://www.w3.org/2000/svg\"><desc xmlns:tactic=\"http://tactic.foo\"><tactic:name>Аэродром (полевой аэродром)</tactic:name><tactic:group>aviation</tactic:group><tactic:rotation>fixed</tactic:rotation><tactic:id>aerodrome</tactic:id></desc></svg>");
        expect(parsed).toBeDefined();
        expect(parsed?.meta).toEqual(
            {
                defaultAngle: 0,
                group: "aviation",
                id: "aerodrome",
                keuz: undefined,
                name: "Аэродром (полевой аэродром)",
                rotationType: "fixed"
            }
        );

        expect(parsed?.svg()).toBeDefined();

        expect(parseSVG("")).toBeUndefined();


        parsed = parseSVG("<svg xmlns:tactic=\"http://tactic.foo\" xmlns=\"http://www.w3.org/2000/svg\"><desc xmlns:tactic=\"http://tactic.foo\"><tactic:group>aviation</tactic:group><tactic:rotation>fixed</tactic:rotation><tactic:id>aerodrome</tactic:id></desc></svg>");
        expect(parsed?.meta).toEqual(
            {
                defaultAngle: 0,
                group: "aviation",
                id: "aerodrome",
                keuz: undefined,
                name: "aerodrome",
                rotationType: "fixed"
            }
        );
        parsed = parseSVG("<svg xmlns:tactic=\"http://tactic.foo\" xmlns=\"http://www.w3.org/2000/svg\"><desc xmlns:tactic=\"http://tactic.foo\"><tactic:rotation>fixed</tactic:rotation><tactic:id>aerodrome</tactic:id></desc></svg>");
        expect(parsed?.meta).toEqual(
            {
                defaultAngle: 0,
                group: undefined,
                id: "aerodrome",
                keuz: undefined,
                name: "aerodrome",
                rotationType: "fixed"
            }
        );
        parsed = parseSVG("<svg xmlns:tactic=\"http://tactic.foo\" xmlns=\"http://www.w3.org/2000/svg\"><desc xmlns:tactic=\"http://tactic.foo\"><tactic:id>aerodrome</tactic:id></desc></svg>");
        expect(parsed?.meta).toEqual(
            {
                defaultAngle: 0,
                group: undefined,
                id: "aerodrome",
                keuz: undefined,
                name: "aerodrome",
                rotationType: "rotate"
            }
        );
        parsed = parseSVG("<svg xmlns:tactic=\"http://tactic.foo\" xmlns=\"http://www.w3.org/2000/svg\"><desc xmlns:tactic=\"http://tactic.foo\"></desc></svg>");
        expect(parsed?.meta).toEqual(
            {
                defaultAngle: 0,
                group: undefined,
                id: undefined,
                keuz: undefined,
                name: undefined,
                rotationType: "rotate"
            }
        );
    });

    test("parseJsonText", () => {
        return Promise.all([
            parseJsonText(`[
            "<svg xmlns:tactic='http://tactic.foo' xmlns='http://www.w3.org/2000/svg'><desc xmlns:tactic='http://tactic.foo'><tactic:id>aerodrome</tactic:id></desc></svg>",
            "<svg xmlns:tactic='http://tactic.foo' xmlns='http://www.w3.org/2000/svg'><desc xmlns:tactic='http://tactic.foo'><tactic:id>foo</tactic:id></desc></svg>"
        ]`).then((list) => {
                expect(list.map((v) => v.meta)).toEqual([

                    {
                        defaultAngle: 0,
                        group: undefined,
                        id: "aerodrome",
                        keuz: undefined,
                        name: "aerodrome",
                        rotationType: "rotate"
                    },

                    {
                        defaultAngle: 0,
                        group: undefined,
                        id: "foo",
                        keuz: undefined,
                        name: "foo",
                        rotationType: "rotate"
                    }
                ]);
            }),
            parseJsonText("[]").then((list) => {
                expect(list).toEqual([]);
            })
        ]);
    });
});