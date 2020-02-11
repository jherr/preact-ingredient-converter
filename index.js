import { h, render } from 'preact';
import { useReducer } from 'preact/hooks';

const conversions = {
  Flour: 4.25,
  Sugar: 7,
  'Brown Sugar': 7.5,
  'Chocolate Chips': 6,
  Cocoa: 3,
  Raisins: 5.5,
  Walnuts: 4,

};

const App = () => {
  const [state,dispatch] = useReducer((state, action) => {
    switch(action) {
      case 'setIngredient':
        return {
          ...state,
          ingredient: action.payload,
        };
      case 'setCups':
        return {
          ...state,
          cups: action.payload,
        };
     }
  });

  const ounces = state.cups * conversions[state.ingredient];
  const pounds = Math.floor(ounces / 16);
  const conversionText = ounces > 16 ?
    `${pounds} Lbs ${ounces - (pounds * 16)} Oz` : `${ounces} Oz`;

  return (
    <div class="mui-container">
      <div class="mui-row">
        <div class="mui-col-md-6">
          <form class="mui-form">
            <div class="mui-textfield">
              <input
                onInput={e => dispatch('setCups', { payload: e.target.value })}
                value={state.cups}
              />
              <label>Cups</label>
            </div>
            <div class="mui-select">
              <select
                onInput={e => dispatch('setIngredient', { payload: e.target.value })}
              >
                {Object.keys(conversions).map(k => (
                  <option
                    value={k}
                    selected={state.ingredient === k}
                    key={k}
                  >
                    {k}
                  </option>
                ))}
              </select>
              <label>Ingredient</label>
            </div>
          </form>
        </div>
        <div class="mui-col-md-6">
          <div class="mui--text-display2">
            Conversion
          </div>
          <div
            class="mui--text-dark mui--text-display3"
            style={{ marginTop: '0.5em', fontWeight: 'bold' }}
          >
            {conversionText}
          </div>
        </div>
      </div>
    </div>
  );
};

const mountNode = document.getElementById('app');
render(<App />, mountNode, mountNode.lastChild);
