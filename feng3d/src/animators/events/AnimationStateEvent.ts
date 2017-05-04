module feng3d
{

	/**
	 * Dispatched to notify changes in an animation state's state.
	 */
	export class AnimationStateEvent extends Event
	{
		/**
		 * Dispatched when a non-looping clip node inside an animation state reaches the end of its timeline.
		 */
		public static PLAYBACK_COMPLETE: string = "playbackComplete";

		public static TRANSITION_COMPLETE: string = "transitionComplete";

		private _animator: AnimatorBase;
		private _animationState: AnimationStateBase;
		private _animationNode: AnimationNodeBase;

		/**
		 * Create a new <code>AnimatonStateEvent</code>
		 *
		 * @param type The event type.
		 * @param animator The animation state object that is the subject of this event.
		 * @param animationNode The animation node inside the animation state from which the event originated.
		 */
		constructor(type: string, animator: AnimatorBase, animationState: AnimationStateBase, animationNode: AnimationNodeBase)
		{
			super(type, false, false);

			this._animator = animator;
			this._animationState = animationState;
			this._animationNode = animationNode;
		}

		/**
		 * The animator object that is the subject of this event.
		 */
		public get animator(): AnimatorBase
		{
			return this._animator;
		}

		/**
		 * The animation state object that is the subject of this event.
		 */
		public get animationState(): AnimationStateBase
		{
			return this._animationState;
		}

		/**
		 * The animation node inside the animation state from which the event originated.
		 */
		public get animationNode(): AnimationNodeBase
		{
			return this._animationNode;
		}

		/**
		 * Clones the event.
		 *
		 * @return An exact duplicate of the current object.
		 */
		public clone(): Event
		{
			return new AnimationStateEvent(this.type, this._animator, this._animationState, this._animationNode);
		}
	}
}
