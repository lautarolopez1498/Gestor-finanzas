import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      date: "",
      category: "",
      amount: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  addExpense(e) {
    fetch("api/registros", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    e.preventDefault();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <nav className="cyan darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              Gestor finanzas
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addExpense}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Nombre del gasto"
                        ></input>
                      </div>
                      <div className="input-field col s12">
                        <input
                          name="date"
                          onChange={this.handleChange}
                          type="date"
                        ></input>
                      </div>
                      <div className="input-field col s12">
                        <input
                          name="category"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Categoria"
                        ></input>
                      </div>
                      <div className="input-field col s12">
                        <input
                          name="amount"
                          onChange={this.handleChange}
                          type="number"
                          placeholder="Importe"
                        ></input>
                      </div>
                    </div>
                    <button type="submit" className="btn cyan darken-4">
                      Enviar
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
