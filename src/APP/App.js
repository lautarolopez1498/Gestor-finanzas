import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      date: "",
      category: "",
      amount: "",
      expenses: [],
      _id: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  addExpense(e) {
    if (this.state._id) {
      fetch(`/api/registros/${this.state._id}`, {
        method: "PATCH",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "El registro ha sido actualizado" });
          this.setState({
            title: "",
            date: "",
            category: "",
            amount: "",
            expenses: [],
            _id: "",
          });
          this.getExpenses();
        });
    } else {
      fetch("api/registros", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Se ha ingresado un nuevo registro" });
          this.setState({
            title: "",
            date: "",
            category: "",
            amount: "",
          });
          this.getExpenses();
        })
        .catch((err) => console.log(err));
    }
    e.preventDefault();
  }

  componentDidMount() {
    this.getExpenses();
  }

  getExpenses() {
    fetch("/api/registros")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ expenses: data.payload });
        console.log(this.state.expenses);
      });
  }

  deleteExpense(id) {
    if (confirm("Desea eliminar este registro?")) {
      fetch(`api/registros/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "El registro ha sido eliminado" });
          this.getExpenses();
        });
    }
  }

  editExpense(id) {
    fetch(`/api/registros/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          title: data.payload.title,
          date: data.payload.date,
          category: data.payload.category,
          amount: data.payload.amount,
          _id: data.payload._id,
        });
      });
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
        <br></br>
        <br></br>
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
                          value={this.state.title}
                        ></input>
                      </div>
                      <div className="input-field col s12">
                        <input
                          name="date"
                          onChange={this.handleChange}
                          type="date"
                          value={this.state.date}
                        ></input>
                      </div>
                      <div className="input-field col s12">
                        <input
                          name="category"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Categoria"
                          value={this.state.category}
                        ></input>
                      </div>
                      <div className="input-field col s12">
                        <input
                          name="amount"
                          onChange={this.handleChange}
                          type="number"
                          placeholder="Importe"
                          value={this.state.amount}
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
            <div className="col s7">
              <h3>Dashboard</h3>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Gasto</th>
                    <th>Fecha</th>
                    <th>Categoria</th>
                    <th>Importe</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.expenses.map((expense) => {
                    return (
                      <tr key={expense._id}>
                        <td>{expense.title}</td>
                        <td>{expense.date}</td>
                        <td>{expense.category}</td>
                        <td>{expense.amount}</td>
                        <td>
                          <button
                            className="btn cyan darken-4"
                            onClick={() => this.editExpense(expense._id)}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                          <button
                            className="btn red darken-1"
                            style={{ margin: "4px" }}
                            onClick={() => this.deleteExpense(expense._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
