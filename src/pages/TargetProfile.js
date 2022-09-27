import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { useParams } from "react-router-dom";

// components
import NoteCard from "../components/NoteCard";
import TargetCard from "../components/TargetCard";
import API from "../helper/API";

const withParams = (Component) => (props) => {
  const { id } = useParams();

  return <Component {...props} id={id} />;
};

class TargetProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      NotesCount: 5,
      type: "",
      description: "",
      CreateDate: "",
      UpdateDate: "",
      notes: [],
      relations: [],
      RelatedBY: [],
      targets: [],
      operation: "",
      NotesTab: 1,
      RelationsTab: 0,
      RelatedByTab: 0,
      NotesModal: false,
      RelationsModal: false,
      NewNote: {
        title: "",
        text: "",
        type: "",
      },
      NewRelation: {
        RelatedTargetName: "Related Target",
        RelatedTarget: "",
        type: "",
        description: "",
      },
    };

    this.switchSlider = this.switchSlider.bind(this);
    this.NotesModal = this.NotesModal.bind(this);
    this.RelationsModal = this.RelationsModal.bind(this);
    this.GetTargetInfo = this.GetTargetInfo.bind(this);
    this.GetNotes = this.GetNotes.bind(this);
    this.UpdateNoteTitle = this.UpdateNoteTitle.bind(this);
    this.UpdateNoteText = this.UpdateNoteText.bind(this);
    this.UpdateNoteType = this.UpdateNoteType.bind(this);
    this.UpdateRelationRelatedTarget =
      this.UpdateRelationRelatedTarget.bind(this);
    this.UpdateRelationType = this.UpdateRelationType.bind(this);
    this.UpdateRelationDescription = this.UpdateRelationDescription.bind(this);
    this.UploadNote = this.UploadNote.bind(this);
    this.UploadRelation = this.UploadRelation.bind(this);
    this.GetRelations = this.GetRelations.bind(this);
    this.GetRelatedByTargets = this.GetRelatedByTargets.bind(this);
    this.GetTargets = this.GetTargets.bind(this);
    this.UpdateRelationRelatedTargetName =
      this.UpdateRelationRelatedTargetName.bind(this);
  }

  async GetRelatedByTargets() {
    const data = {
      TargetID: this.props.id,
    };

    await API.post("/get_related_by_targets", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.setState({
            RelatedBY: res.data,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetTargets() {
    const id = window.sessionStorage.getItem("token");
    const data = { Token: id };

    await API.post("/get_targets_by_user", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.setState({ targets: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  UpdateRelationRelatedTarget(value) {
    this.setState((prevState) => ({
      NewRelation: {
        ...prevState.NewRelation,
        RelatedTarget: value,
      },
    }));
  }

  UpdateRelationRelatedTargetName(value) {
    this.setState((prevState) => ({
      NewRelation: {
        ...prevState.NewRelation,
        RelatedTargetName: value,
      },
    }));
  }

  UpdateRelationType(event) {
    this.setState((prevState) => ({
      NewRelation: {
        ...prevState.NewRelation,
        type: event.target.value,
      },
    }));
  }

  UpdateRelationDescription(event) {
    this.setState((prevState) => ({
      NewRelation: {
        ...prevState.NewRelation,
        description: event.target.value,
      },
    }));
  }

  async UploadRelation() {
    const data = {
      RelationType: this.state.NewRelation.type,
      Token: window.sessionStorage.getItem("token"),
      RelationRelatedTarget: this.state.NewRelation.RelatedTarget,
      RelationDescription: this.state.NewRelation.description,
      RelationTarget: this.props.id,
    };

    await API.post("/add_relation", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.GetRelations();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  UpdateNoteTitle(event) {
    this.setState((prevState) => ({
      NewNote: {
        ...prevState.NewNote,
        title: event.target.value,
      },
    }));
  }

  UpdateNoteText(event) {
    this.setState((prevState) => ({
      NewNote: {
        ...prevState.NewNote,
        text: event.target.value,
      },
    }));
  }

  UpdateNoteType(event) {
    this.setState((prevState) => ({
      NewNote: {
        ...prevState.NewNote,
        type: event.target.value,
      },
    }));
  }

  async UploadNote() {
    const data = {
      Token: window.sessionStorage.getItem("token"),
      NoteOperation: this.state.operation,
      NoteTarget: this.props.id,
      NoteType: this.state.NewNote.type,
      NoteTitle: this.state.NewNote.title,
      NoteText: this.state.NewNote.text,
    };

    await API.post("/add_note", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.GetNotes();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetNotes() {
    const data = {
      TargetID: this.props.id,
    };

    await API.post("/get_notes", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.setState({
            notes: res.data,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetRelations() {
    const data = {
      TargetID: this.props.id,
    };

    await API.post("/get_relations", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.setState({
            relations: res.data,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetTargetInfo() {
    const data = {
      TargetID: this.props.id,
    };

    await API.post("/get_target_info", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.setState({
            id: res.data[0].t_id,
            name: res.data[0].t_name,
            NotesCount: 5,
            type: res.data[0].t_type,
            description: res.data[0].t_description,
            operation: res.data[0].t_operation,
            CreateDate: res.data[0].t_create_date,
            UpdateDate: res.data[0].t_update_date,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  NotesModal() {
    this.setState({
      NotesModal: !this.state.NotesModal,
    });
  }

  RelationsModal() {
    this.setState({
      RelationsModal: !this.state.RelationsModal,
    });
  }

  switchSlider(slide) {
    switch (slide) {
      case "Notes":
        this.setState({
          NotesTab: 1,
          RelationsTab: 0,
          RelatedByTab: 0,
        });
        break;

      case "Relations":
        this.setState({
          NotesTab: 0,
          RelationsTab: 1,
          RelatedByTab: 0,
        });
        break;

      case "RelatedBy":
        this.setState({
          NotesTab: 0,
          RelationsTab: 0,
          RelatedByTab: 1,
        });
        break;

      default:
        break;
    }
  }

  componentDidMount() {
    this.GetTargetInfo();
    this.GetTargets();
    this.GetNotes();
    this.GetRelations();
    this.GetRelatedByTargets();
  }

  render() {
    return (
      <div className="TargetProfile">
        <div className="TargetProfileHeader">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt="user-card"
          />
          <div className="TargetProfileInfo">
            <ul>
              <li>Name: {this.state.name}</li>
              <li>Notes Count: 5</li>
              <li>Type: {this.state.type}</li>
              <li>Create Date: {this.state.CreateDate}</li>
              <li>Last Update: {this.state.UpdateDate}</li>
              <li>Description: {this.state.description}</li>
            </ul>
          </div>
        </div>

        <div className="TargetProfileSlider">
          <div className="btns-container">
            <button
              className="profile-slider-btn btn btn-secondary"
              onClick={() => {
                this.switchSlider("Notes");
              }}
            >
              Notes
            </button>
            <button
              className="profile-slider-btn  btn btn-secondary"
              onClick={() => {
                this.switchSlider("Relations");
              }}
            >
              Relations
            </button>
            <button
              className="profile-slider-btn  btn btn-secondary"
              onClick={() => {
                this.switchSlider("RelatedBy");
              }}
            >
              Related By
            </button>
          </div>

          <div
            className="NotesSlide"
            style={{ display: this.state.NotesTab ? null : "none" }}
          >
            <div className="SearchContainer">
              <div>
                <button disabled>Search</button>
                <input
                  placeholder="Search by title or description"
                  type="text"
                  className="Search"
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <button disabled>Sort by</button>
                <select className="Sort">
                  <option value="Name">Title</option>
                  <option value="Date">Date</option>
                </select>
              </div>
              <button className="NewObject" onClick={this.NotesModal}>
                New Note
              </button>
            </div>

            <div>
              {this.state.notes.map((note, i) => {
                return (
                  <NoteCard
                    key={i}
                    id={note.n_id}
                    title={note.n_title}
                    text={note.n_text}
                    author={note.u_name}
                    CreateDate={note.n_create_date}
                    UpdateDate={note.n_update_date}
                  />
                );
              })}
            </div>
          </div>

          <div
            className="RelationSlide"
            style={{ display: this.state.RelationsTab ? null : "none" }}
          >
            <div className="SearchContainer">
              <div>
                <button disabled>Search</button>
                <input
                  placeholder="Search by title or description"
                  type="text"
                  className="Search"
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <button disabled>Sort by</button>
                <select className="Sort">
                  <option value="Name">Title</option>
                  <option value="Date">Date</option>
                </select>
              </div>
              <button className="NewObject" onClick={this.RelationsModal}>
                New Relation
              </button>
            </div>
            {this.state.relations.map((relation, i) => {
              return (
                <TargetCard
                  key={i}
                  id={relation.t_id}
                  name={relation.t_name}
                  description={relation.t_description}
                  type={relation.t_type}
                  relation={relation.r_type}
                  CreateDate={relation.t_create_date}
                  UpdateDate={relation.t_update_date}
                />
              );
            })}
          </div>

          <div
            className="RelatedBySlide"
            style={{ display: this.state.RelatedByTab ? null : "none" }}
          >
            <div className="SearchContainer">
              <div>
                <button disabled>Search</button>
                <input
                  placeholder="Search by title or description"
                  type="text"
                  className="Search"
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <button disabled>Sort by</button>
                <select className="Sort">
                  <option value="Name">Title</option>
                  <option value="Date">Date</option>
                </select>
              </div>
            </div>
            {this.state.RelatedBY.map((relation, i) => {
              return (
                <TargetCard
                  key={i}
                  id={relation.t_id}
                  name={relation.t_name}
                  description={relation.t_description}
                  type={relation.t_type}
                  relation={relation.r_type}
                  CreateDate={relation.t_create_date}
                  UpdateDate={relation.t_update_date}
                />
              );
            })}
          </div>
        </div>

        <Modal show={this.state.NotesModal} onHide={this.NotesModal}>
          <Modal.Header closeButton>
            <Modal.Title>New Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  onChange={this.UpdateNoteTitle}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  onChange={this.UpdateNoteType}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={this.UpdateNoteText}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.NotesModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.UploadNote();
                this.NotesModal();
              }}
            >
              Save Note
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.RelationsModal} onHide={this.RelationsModal}>
          <Modal.Header closeButton>
            <Modal.Title>New Relation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Relation Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Alpha, Bravo"
                  autoFocus
                  onChange={this.UpdateRelationType}
                />
              </Form.Group>

              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {this.state.NewRelation.RelatedTargetName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {this.state.targets.map((target, i) => {
                    return (
                      <Dropdown.Item
                        key={i}
                        href="#/action-1"
                        onClick={() => {
                          this.UpdateRelationRelatedTarget(target.t_id);
                          this.UpdateRelationRelatedTargetName(target.t_name);
                        }}
                      >
                        {target.t_name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={this.UpdateRelationDescription}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.RelationsModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.UploadRelation();
                this.RelationsModal();
              }}
            >
              Save Relation
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withParams(TargetProfile);
