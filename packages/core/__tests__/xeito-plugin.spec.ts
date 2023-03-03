import { describe, expect, test } from "vitest";
import { XeitoPlugin } from "../classes/xeito-plugin";

describe('Xeito Plugin Class', () => {

  test('Xeito Plugin class exists', () => {
    expect(XeitoPlugin).toBeDefined();
  })
  
  test('A new plugin can be created by extending the XeitoPlugin class', () => {
    class TestPlugin extends XeitoPlugin {};
    const T = new TestPlugin({} as any);
    expect(T).toBeInstanceOf(XeitoPlugin);
  })

  test('A plugin has the required methods', () => {
    class TestPlugin extends XeitoPlugin {};
    const T = new TestPlugin({} as any);

    expect(T.install).toBeInstanceOf(Function);
    expect(T.registerGlobalAction).toBeInstanceOf(Function);
    expect(T.registerGlobalProperty).toBeInstanceOf(Function);
    expect(T.registerGlobalPipe).toBeInstanceOf(Function);
    expect(T.registerGlobalComponent).toBeInstanceOf(Function);

  });

});
