import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  LinearProgress,
  DialogTitle,
  DialogContent,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import swal from "sweetalert";
import "./Dashboard.css";
const axios = require("axios");

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      openmemberModal: false,
      openmemberEditModal: false,
      id: "",
      name: "",
      addr: "",
      email: "",
      ent: "",
      birthday: "",
      file: "",
      fileName: "",
      page: 1,
      search: "",
      members: [],
      pages: 0,
      loading: false,
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem("token");

    if (!token) {
      this.props.history.push("/login");
    } else {
      this.setState({ token: token }, () => {
        this.getmember();
      });
    }
  };

  getmember = () => {
    this.setState({ loading: true });

    let data = "?";
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios
      .get(`http://localhost:2000/get-member${data}`, {
        headers: {
          token: this.state.token,
        },
      })
      .then((res) => {
        this.setState({
          loading: false,
          members: res.data.members,
          pages: res.data.pages,
        });
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        this.setState({ loading: false, members: [], pages: 0 }, () => {});
      });
  };

  deletemember = (id) => {
    axios
      .post(
        "http://localhost:2000/delete-member",
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: this.state.token,
          },
        }
      )
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        this.setState({ page: 1 }, () => {
          this.pageChange(null, 1);
        });
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
      });
  };

  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getmember();
    });
  };

  logOut = () => {
    localStorage.setItem("token", null);
    this.props.history.push("/");
  };

  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => {});
    }
    this.setState({ [e.target.name]: e.target.value }, () => {});
    if (e.target.name == "search") {
      this.setState({ page: 1 }, () => {
        this.getmember();
      });
    }
  };

  addmember = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append("file", fileInput.files[0]);
    file.append("name", this.state.name.toLowerCase());
    file.append("addr", this.state.addr);
    file.append("ent", this.state.ent);
    file.append("birthday", this.state.birthday);
    file.append("email", this.state.email);

    axios
      .post("http://localhost:2000/add-member", file, {
        headers: {
          "content-type": "multipart/form-data",
          token: this.state.token,
        },
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        this.handlememberClose();
        this.setState(
          {
            name: "",
            addr: "",
            ent: "",
            email: "",
            birthday: "",
            file: null,
            page: 1,
          },
          () => {
            this.getmember();
          }
        );
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        this.handlememberClose();
      });
  };

  updatemember = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append("id", this.state.id);
    file.append("file", fileInput.files[0]);
    file.append("name", this.state.name.toLowerCase());
    file.append("addr", this.state.addr);
    file.append("ent", this.state.ent);
    file.append("birthday", this.state.birthday);
    file.append("email", this.state.email);

    axios
      .post("http://localhost:2000/update-member", file, {
        headers: {
          "content-type": "multipart/form-data",
          token: this.state.token,
        },
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        this.handlememberEditClose();
        this.setState(
          { name: "", addr: "", ent: "", email: "", birthday: "", file: null },
          () => {
            this.getmember();
          }
        );
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        this.handlememberEditClose();
      });
  };

  handlememberOpen = () => {
    this.setState({
      openmemberModal: true,
      id: "",
      name: "",
      addr: "",
      email: "",
      ent: "",
      birthday: "",
      fileName: "",
    });
  };

  handlememberClose = () => {
    this.setState({ openmemberModal: false });
  };

  handlememberEditOpen = (data) => {
    this.setState({
      openmemberEditModal: true,
      id: data._id,
      name: data.name,
      addr: data.addr,
      email: data.email,
      ent: data.ent,
      birthday: data.birthday,
      fileName: data.image,
    });
  };

  handlememberEditClose = () => {
    this.setState({ openmemberEditModal: false });
  };

  render() {
    return (
      <div>
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <h2 className="club">Actimi Club Dashboard </h2>

          <div className="add">
            <Button
              className="draw-border add"
              variant="contained"
              color="primary"
              size="small"
              onClick={this.handlememberOpen}
            >
              Add Member
            </Button>

            <Button
              className="draw-border add"
              variant="contained"
              size="small"
              onClick={this.logOut}
            >
              Log Out
            </Button>
          </div>
        </div>

        {/* Editing the member */}
        <Dialog
          open={this.state.openmemberEditModal}
          onClose={this.handlememberClose}
          aria-labelledby="alert-dialog-title"
          aria-addrribedby="alert-dialog-addrription"
        >
          <DialogTitle id="alert-dialog-title">Edit member</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder=" Name"
              required
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="addr"
              value={this.state.addr}
              onChange={this.onChange}
              placeholder="Address"
              required
            />
            <br />
            <br />
            <TextField
              type="email"
              autoComplete="on"
              name="email"
              id="email"
              ref="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email"
              required
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              type="date"
              autoComplete="off"
              name="ent"
              value={this.state.ent}
              onChange={this.onChange}
              placeholder="Entrance date"
              required
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              type="date"
              autoComplete="off"
              name="brthday"
              value={this.state.birthday}
              onChange={this.onChange}
              placeholder="Birthday"
              required
            />
            <br />
            <br />
            <Button variant="contained" component="label">
              {" "}
              Upload
              <input
                id="standard-basic"
                type="file"
                accept="image/*"
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                placeholder="File"
                hidden
                required
              />
            </Button>
            &nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handlememberEditClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={
                this.state.name == "" ||
                this.state.addr == "" ||
                this.state.ent == "" ||
                this.state.email == "" ||
                this.state.birthday == ""
              }
              onClick={(e) => this.updatemember()}
              color="primary"
              autoFocus
            >
              Edit member
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add member */}
        <Dialog
          open={this.state.openmemberModal}
          onClose={this.handlememberClose}
          aria-labelledby="alert-dialog-title"
          aria-addrribedby="alert-dialog-addrription"
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle className="dialog" id="alert-dialog-title">
            Add member
          </DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Member Name"
              required
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="addr"
              value={this.state.addr}
              onChange={this.onChange}
              placeholder="Address"
              required
            />
            <br />
            <br />
            <TextField
              type="email"
              autoComplete="on"
              id="email"
              ref="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email"
              required
            />
            <br />
            <br />
            Entrance Date
            <br />
            <TextField
              id="standard-basic"
              type="date"
              autoComplete="off"
              name="ent"
              value={this.state.ent}
              onChange={this.onChange}
              placeholder="ent"
              required
            />
            <br />
            <br />
            <br />
            Birthday
            <br />
            <TextField
              id="standard-basic"
              type="date"
              autoComplete="off"
              name="birthday"
              value={this.state.birthday}
              onChange={this.onChange}
              placeholder="birthday"
              required
            />
            <br />
            <br />
            <strong>
              Please Upload profile <br />
              pic before clicking Add
            </strong>
            <br />
            <br />
            <Button variant="contained" component="label">
              {" "}
              Upload Member pic
              <input
                id="standard-basic"
                type="file"
                accept="image/*"
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                placeholder="File"
                hidden
                required
              />
            </Button>
            &nbsp;
            {this.state.fileName}
          </DialogContent>
          <br />
          <DialogActions style={{ justifyContent: "center" }}>
            <Button onClick={this.handlememberClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={
                this.state.name == "" ||
                this.state.addr == "" ||
                this.state.ent == "" ||
                this.state.email == "" ||
                this.state.birthday == "" ||
                this.state.file == null
              }
              onClick={(e) => this.addmember()}
              color="primary"
              autoFocus
            >
              Add member
            </Button>
          </DialogActions>
        </Dialog>

        <br />

        <TableContainer>
          <div class="wrap">
            <div classname="search">
              <TextField
                id="special"
                className="searchTerm"
                type="search"
                autoComplete="off"
                name="search"
                value={this.state.search}
                onChange={this.onChange}
                placeholder="Search by Name"
                required
              />
            </div>
          </div>
          <div className="rows">
            <Table aria-label="simple table">
              <TableHead className="tablehead">
                <TableRow>
                  <TableCell className="" align="center">
                    Profile Pic
                  </TableCell>
                  <TableCell className="" align="center">
                    Member Name
                  </TableCell>
                  <TableCell className="" align="center">
                    Email
                  </TableCell>
                  <TableCell className="" align="center">
                    Address
                  </TableCell>

                  <TableCell className="" align="center">
                    Entrance Date
                  </TableCell>
                  <TableCell className="" align="center">
                    Birthday
                  </TableCell>
                  <TableCell className="" align="center">
                    Edit/ Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.members.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">
                      <img
                        src={`http://localhost:2000/${row.image}`}
                        width="80"
                        height="80"
                      />
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.addr}</TableCell>

                    <TableCell align="center">{row.ent}</TableCell>
                    <TableCell align="center">{row.birthday}</TableCell>

                    <TableCell align="center">
                      <Button
                        className="button_style"
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={(e) => this.handlememberEditOpen(row)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="button_style"
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={(e) => this.deletemember(row._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <br />
          <br />
          <div classname="pagination">
            <Pagination
              count={this.state.pages}
              page={this.state.page}
              onChange={this.pageChange}
              color="primary"
            />
          </div>
          <br />
          <br />
          <br />
          <br />
        </TableContainer>
      </div>
    );
  }
}
