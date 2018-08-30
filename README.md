tech-test-monzo
===============

Hello, welcome to my take on the "Monzo developer portal" demo :)

Built (mainly) with:

 * typescript
 * react
 * redux
 * redux-observable
 * redux-rx-http (my http libary, I'd recommend taking a look at this too as I
   spent several hours today bringing it up to date with RxJS 6)

Features

  * Auth HOC which persists the token, and also catches any 401 requests and
    automatically logs out (using auth epics)
  * Fully typed
  * Demonstration of how epics can be used to do loading spinners
  * Progressive loading users
  * Any data access is done through selectors so changing structure of state is
    simple.

In order to run:

 * `yarn`
 * `yarn start`

Things not done:

 * Enzyme/Jest test suite (takes too much time for a tech test)
 * Using styled-components properly.
 * Perfect CSS