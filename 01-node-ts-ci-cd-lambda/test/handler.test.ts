import { handler } from "../src/index";

describe("handler", () => {
  it("returns 200 and a JSON body with the greeting message", async () => {
    const result = await handler();

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      message: "Hello CI/CD TS 🚀",
    });
  });
});
