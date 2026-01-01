Issue - see an old value of count

Fixes:
1. Dependency:
   1. Note that we still have a warning
   2. Note that we register and remove the listener every change now. Might lead to erratic behavior
2. Use ref
   1. Note that we cannot change the ref outside a useEffect (React doesn't allow mutation during render)
   2. Remember the ref changes don't cause re-render, so we can't simply replace count with ref. We need both 
3. prev value
   1. First, it's probably often/most times a good idea to use prev
   2. Note that is specific to this problem. If we have console.log, it wouldn't have helped us
      1. Actually, we could've added the console.log inside the prev update function, but that seems like poor coding
4. React 19 - useEffectEvent:
   1. Experimental
   2. Only use for non-reactive logic (i.e., if you want to re-run the useEffect, you still need the dependency)
   3. Non-reactive logic = logic that should always see the latest values, but should not cause the effect to re-run when those values change.
   4. If a value is only used inside an Effect Event, it must NOT be in the dependency array.