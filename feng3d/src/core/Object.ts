namespace feng3d
{
    // export type Type = new () => Object;
    export type Type<T extends Object> = new () => T;

    /**
     * Base class for all objects feng3d can reference.
     * 
     * Any public variable you make that derives from Object gets shown in the inspector as a drop target, allowing you to set the value from the GUI.
     */
    export class Object
    {
        //------------------------------------------
        // Variables
        //------------------------------------------
        /**
         * Should the object be hidden, saved with the scene or modifiable by the user?
         */
        public hideFlags: HideFlags;

        /**
         * The name of the object.
         */
        public name: string;

        //------------------------------------------
        // Public Functions
        //------------------------------------------
        constructor()
        {
            this._uuid = Math.generateUUID();
        }

        /**
         * Returns the instance id of the object.
         */
        public getInstanceID()
        {
            return this._uuid;
        }

        /**
         * Returns the name of the game object.
         */
        public toString()
        {
            return this.name;
        }

        //------------------------------------------
        // Static Functions
        //------------------------------------------
        /**
         * Removes a gameobject, component or asset.
         * @param obj	The object to destroy.
         * @param t	    The optional amount of time to delay before destroying the object.
         */
        public static destroy(obj: Object, t: number = 0)
        {

        }

        /**
         * Destroys the object obj immediately.
         * @param obj	                    Object to be destroyed.
         * @param allowDestroyingAssets	    Set to true to allow assets to be destoyed.
         */
        public static destroyImmediate(obj: Object, allowDestroyingAssets = false)
        {

        }

        /**
         * Makes the object target not be destroyed automatically when loading a new scene.
         */
        public static dontDestroyOnLoad(target: Object)
        {

        }

        /**
         * Returns the first active loaded object of Type type.
         */
        public static findObjectOfType<T extends Object>(type: Type<T>): T
        {

            return null;
        }

        /**
         * Returns a list of all active loaded objects of Type type.
         */
        public static findObjectsOfType<T extends Object>(type: Type<T>): T[]
        {
            return null;
        }

        /**
         * Returns a copy of the object original.
         * @param original	An existing object that you want to make a copy of.
         * @param position	Position for the new object(default Vector3.zero).
         * @param rotation	Orientation of the new object(default Quaternion.identity).
         * @param parent	The transform the object will be parented to.
         * @param worldPositionStays	If when assigning the parent the original world position should be maintained.
         */
        public static instantiate<T extends Object>(original: T, position: Vector3D = null, rotation: Quaternion = null, parent: Transform = null, worldPositionStays: boolean = false): T
        {
            return null;
        }

        //------------------------------------------
        // Private Properties
        //------------------------------------------
        private _uuid: string;

        //------------------------------------------
        // Private Methods
        //------------------------------------------
    }
}