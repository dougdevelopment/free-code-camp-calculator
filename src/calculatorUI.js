import React from "react"

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentEquation: "0",
        decimalFlag: false,
        operatorFlag: false.valueOf,
        mode: "light",
      };
      this.handleClear = this.handleClear.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleEquals = this.handleEquals.bind(this);
      this.darkMode = this.darkMode.bind(this);
    }

    darkMode(){
        this.setState({
            mode: this.state.mode === "light" ? "dark" : "light"
        })
    }
  
    //handle Clear
    handleClear() {
      this.setState({
        currentEquation: "0",
        decimalFlag: false,
        operatorFlag: false
      });
    }
  
    //handle Equals
    handleEquals() {
      this.setState({
        currentEquation: eval(this.state.currentEquation).toString(),
        operatorFlag: false
      });
    }
  
    //handle button click
    handleClick(buttonName) {
      let currentEqu = this.state.currentEquation;
      let dec = this.state.decimalFlag;
      let operator = this.state.operatorFlag;
      let array = currentEqu.split("");
      switch (true) {
        case buttonName === "0" ||
          buttonName === "1" ||
          buttonName === "2" ||
          buttonName === "3" ||
          buttonName === "4" ||
          buttonName === "5" ||
          buttonName === "6" ||
          buttonName === "7" ||
          buttonName === "8" ||
          buttonName === "9":
          if (currentEqu === "0") {
            currentEqu = buttonName;
          } else {
            currentEqu += buttonName;
            operator = false;
          }
          break;
  
        case buttonName === "-":
          if (array[array.length - 2] !== "-") {
            currentEqu += buttonName;
            dec = false;
            operator = true;
          }
          break;
  
        case buttonName === "+" || buttonName === "*" || buttonName === "/":
          if (operator === false) {
            currentEqu += buttonName;
            dec = false;
            operator = true;
          } else if (
            operator === true &&
            array[array.length - 1] === "-" &&
            array[array.length - 2] !== "-"
          ) {
            array.pop();
            array.pop();
            array.push(buttonName);
            currentEqu = array.join("");
            operator = false;
          } else if (operator === true) {
            let newEqu = currentEqu.slice(0, currentEqu.length - 1);
            newEqu += buttonName;
            currentEqu = newEqu;
          }
          break;
  
        case buttonName === ".":
          if (dec === false) {
            currentEqu += buttonName;
            dec = true;
          }
          break;
      }
      this.setState({
        currentEquation: currentEqu,
        decimalFlag: dec,
        operatorFlag: operator
      });
    }
  
    render() {
      return (
        <div id='app-container' className={this.state.mode}>
        <div id='UI-container'>
          <div id="display">
              <div id="display-text">{this.state.currentEquation}</div>
            </div>
            <div className="flex-grid">
                <div className="col">
                    <Button id="clear"  name="c" handleClick={this.handleClear} />
                    <Button id="divide" name="/" handleClick={() => this.handleClick("/")} />
                </div>
                <div className="col">
                    <Button id="seven"  name="7" handleClick={() => this.handleClick("7")} />
                    <Button id="eight"  name="8" handleClick={() => this.handleClick("8")} />
                    <Button id="nine" name="9" handleClick={() => this.handleClick("9")} />
                    <Button id="multiply"  name="*" handleClick={() => this.handleClick("*")} />
                </div>
                <div className="col">
                    <Button id="four" name="4" handleClick={() => this.handleClick("4")} />
                    <Button id="five"  name="5" handleClick={() => this.handleClick("5")} />
                    <Button id="six"  name="6" handleClick={() => this.handleClick("6")} />
                    <Button id="subtract"  name="-" handleClick={() => this.handleClick("-")} />
                </div>
                <div className="col">
                    <Button id="one"  name="1" handleClick={() => this.handleClick("1")} />
                    <Button id="two"  name="2" handleClick={() => this.handleClick("2")} />
                    <Button id="three" name="3" handleClick={() => this.handleClick("3")} />
                    <Button id="add" name="+" handleClick={() => this.handleClick("+")} />
                </div>
                <div className='col'>
                    <Button id="zero"  name="0" handleClick={() => this.handleClick("0")} />
                    <Button id="decimal"  name="." handleClick={() => this.handleClick(".")}/>
                    <Button id="equals"  name="=" handleClick={this.handleEquals} />
                </div>
            </div>
        </div>

        <div id='toggle' >
            <div id='switch' onClick={this.darkMode}></div>
        </div>
        </div>
      );
    }
  }
  
  class Button extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <button
          id={this.props.id}
          name={this.props.name}
          onClick={this.props.handleClick}
        >
          {this.props.name}
        </button>
      );
    }
  }
  
export default App
  