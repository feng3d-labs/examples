module feng3d
{
    //webgl 1
    // export type GL = WebGLRenderingContext;
    export var GL = WebGL2RenderingContext || WebGLRenderingContext;
    export interface GL extends WebGL2RenderingContext
    {
        /**
         * 唯一标识符
         */
        uuid: string;

        proxy: GLProxy;
    }
}