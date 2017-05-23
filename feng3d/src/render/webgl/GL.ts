module feng3d
{
    //webgl 1
    // export type GL = WebGLRenderingContext;
    export var GL = WebGLRenderingContext;
    export interface GL extends WebGLRenderingContext
    {
        /**
         * 唯一标识符
         */
        uuid: string;
    }
}