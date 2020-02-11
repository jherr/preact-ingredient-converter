import { h, render } from 'preact';
import { useState } from 'preact/hooks';

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
  const [cups, setCups] = useState(1);
  const [ingredient, setIngredient] = useState('Flour');

  const ounces = cups * conversions[ingredient];
  const pounds = Math.floor(ounces / 16);
  const conversionText = ounces > 16 ?
    `${pounds} Lbs ${ounces - (pounds * 16)} Oz` : `${ounces} Oz`;

  return (
    <div className="mui-container">
      <div className="mui-row">
        <div className="mui-col-md-6">
          <form className="mui-form">
            <div className="mui-textfield">
              <input
                onInput={e => setCups(e.target.value)}
                value={cups}
              />
              <label>Cups</label>
            </div>
            <div className="mui-select">
              <select
                onInput={e => setIngredient(e.target.value)}
              >
                {Object.keys(conversions).map(k => (
                  <option
                    value={k}
                    selected={ingredient === k}
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
        <div className="mui-col-md-6">
          <div className="mui--text-display2">
            Conversion
          </div>
          <div
            className="mui--text-dark mui--text-display3"
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
