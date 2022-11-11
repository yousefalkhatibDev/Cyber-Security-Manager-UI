import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { useParams } from "react-router-dom";
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faNoteSticky,
  faPeopleArrows,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FiSearch } from "react-icons/fi"
import filterIcon from "../icons/Filter.svg"

// components
import NoteCard from "../components/NoteCard";
import TargetCard from "../components/TargetCard";
import API from "../helper/API";
import Pagination from "../components/Pagination";
import TargetCardDashboard from "../components/TargetCardDashboard"
import ProfilesNavigationBar from "../components/ProfilesNavigationBar";

const withParams = (Component) => (props) => {
  const { id } = useParams();
  return <Component {...props} id={id} />;
};

class TargetProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      image: "",
      name: "",
      NotesCount: 0,
      type: "",
      NotesFilter: "",
      RelationsFilter: "",
      RelatedByFilter: "",
      SearchNotes: "",
      SearchRelations: "",
      SearchRelatedByTargets: "",
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
      SettingsTab: 0,
      NotesModal: false,
      RelationsModal: false,
      SettingsModal: false,
      currentPageNotes: 1,
      notesToDisplayNumber: 4,
      currentPageRelations: 1,
      relationsToDisplayNumber: 4,
      currentPageRelatedBy: 1,
      relatedByToDisplayNumber: 4,
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
      NewInfo: {
        name: "",
        description: "",
        location: "",
      },
    };

    this.SwitchSlider = this.SwitchSlider.bind(this);
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
    this.SettingsModal = this.SettingsModal.bind(this);
    this.GetImage = this.GetImage.bind(this);
    this.GetNotesCount = this.GetNotesCount.bind(this);
    this.UpdateSearchNotes = this.UpdateSearchNotes.bind(this);
    this.UpdateSearchRelations = this.UpdateSearchRelations.bind(this);
    this.UpdateSearchRelatedByTargets =
      this.UpdateSearchRelatedByTargets.bind(this);
    this.UpdateFilterNotes = this.UpdateFilterNotes.bind(this);
    this.UpdateFilterRelations = this.UpdateFilterRelations.bind(this);
    this.UpdateFilterRelatedByTargets =
      this.UpdateFilterRelatedByTargets.bind(this);
    this.InfoModal = this.InfoModal.bind(this);

    this.UploadNewInfo = this.UploadNewInfo.bind(this);
    this.UpdateNewInfoName = this.UpdateNewInfoName.bind(this);
    this.UpdateNewInfoDescription = this.UpdateNewInfoDescription.bind(this);
    this.UpdateNewInfoLocation = this.UpdateNewInfoLocation.bind(this);

    this.DeleteTarget = this.DeleteTarget.bind(this);
    this.DeleteModal = this.DeleteModal.bind(this);

    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.SetLastAccessedTarget = this.SetLastAccessedTarget.bind(this);
  }

  async SetLastAccessedTarget() {
    const data = {
      TargetID: this.props.id,
    };

    await API.post("/set_last_accessed_target", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  InfoModal() {
    this.setState((prevState) => ({
      InfoModal: !this.state.InfoModal,
      NewInfo: {
        ...prevState.NewInfo,
        name: "",
        description: "",
        location: "",
      },
    }));
  }

  async UploadNewInfo() {
    const data = {
      TargetID: this.props.id,
      TargetName: this.state.NewInfo.name,
      TargetDescription: this.state.NewInfo.description,
      TargetLocation: this.state.NewInfo.location,
    };

    await API.post("/update_target_info", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }
        if (res.data) {
          this.GetTargetInfo();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  UpdateNewInfoName(event) {
    this.setState((prevState) => ({
      NewInfo: {
        ...prevState.NewInfo,
        name: event.target.value,
      },
    }));
  }

  UpdateNewInfoDescription(event) {
    this.setState((prevState) => ({
      NewInfo: {
        ...prevState.NewInfo,
        description: event.target.value,
      },
    }));
  }

  UpdateNewInfoLocation(event) {
    this.setState((prevState) => ({
      NewInfo: {
        ...prevState.NewInfo,
        location: event.target.value,
      },
    }));
  }

  async DeleteTarget() {
    const data = {
      TargetID: this.props.id,
    };

    await API.post("/remove_target", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }
        if (res.data) {
          window.location = "/targets";
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  DeleteModal() {
    this.setState({ DeleteModal: !this.state.DeleteModal });
  }

  async UpdateFilterNotes(value) {
    if (value === "all") {
      await this.GetNotes();
    }

    if (value === "title") {
      await this.GetNotes();
      await this.setState({ NotesFilter: value });
      let filteredArray = this.state.notes.sort((a, b) => {
        return a.n_title.localeCompare(b.n_title);
      });
      await this.setState({ notes: filteredArray });
    }

    if (value === "date") {
      await this.GetNotes();
      await this.setState({ NotesFilter: value });
      let filteredArray = this.state.notes.sort((a, b) => {
        var c = new Date(a.n_create_date);
        var d = new Date(b.n_create_date);
        return c - d;
      });
      await this.setState({ notes: filteredArray });
    }
  }

  async UpdateFilterRelations(value) {
    if (value === "all") {
      await this.GetRelations();
    }

    if (value === "date") {
      await this.GetRelations();
      await this.setState({ RelationsFilter: value });
      let filteredArray = this.state.relations.sort((a, b) => {
        var c = new Date(a.t_create_date);
        var d = new Date(b.t_create_date);
        return c - d;
      });
      await this.setState({ relations: filteredArray });
    }

    if (value === "name") {
      await this.GetRelations();
      await this.setState({ RelationsFilter: value });
      let filteredArray = this.state.relations.sort((a, b) => {
        return a.t_name.localeCompare(b.t_name);
      });
      await this.setState({ relations: filteredArray });
    }
  }

  async UpdateFilterRelatedByTargets(value) {
    if (value === "all") {
      await this.GetRelatedByTargets();
    }

    if (value === "date") {
      await this.GetRelatedByTargets();
      await this.setState({ RelatedByFilter: value });
      let filteredArray = this.state.RelatedBY.sort((a, b) => {
        var c = new Date(a.t_create_date);
        var d = new Date(b.t_create_date);
        return c - d;
      });
      await this.setState({ RelatedBY: filteredArray });
    }

    if (value === "name") {
      await this.GetRelatedByTargets();
      await this.setState({ RelatedByFilter: value });
      let filteredArray = this.state.RelatedBY.sort((a, b) => {
        return a.t_name.localeCompare(b.t_name);
      });
      await this.setState({ RelatedBY: filteredArray });
    }
  }

  async UpdateSearchRelatedByTargets(event) {
    await this.setState({ SearchRelatedByTargets: event.target.value });
    this.GetRelatedByTargets();
  }

  async UpdateSearchNotes(event) {
    await this.setState({ SearchNotes: event.target.value });
    this.GetNotes();
  }

  async UpdateSearchRelations(event) {
    await this.setState({ SearchRelations: event.target.value });
    this.GetRelations();
  }

  async GetImage() {
    const data = { TargetID: this.props.id };
    await API.post("/get_target_image", data).then(async (respone) => {
      const res = respone.data;
      if (res.ErrorMessage) {
        window.alert(res.ErrorMessage);
      }
      if (res.data === false) {
        this.setState({
          image:
            "https://img.freepik.com/premium-vector/anonymous-hacker-concept-with-flat-design_23-2147895788.jpg?w=740",
        });
      } else {
        this.setState({ image: res.data.t_image });
      }
    });
  }

  SettingsModal() {
    this.setState({ SettingsModal: !this.state.SettingsModal });
  }

  async GetRelatedByTargets() {
    const data = {
      TargetID: this.props.id,
      SearchRelatedByTargets: this.state.SearchRelatedByTargets,
    };

    await API.post("/get_related_by_targets", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }
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
        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }
        if (res.data) {
          this.setState({ targets: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  UpdateRelationRelatedTarget(event) {
    const nameAndId = event.target.value.split(" ")
    this.setState((prevState) => ({
      NewRelation: {
        ...prevState.NewRelation,
        RelatedTarget: nameAndId[0],
      },
    }));
    this.UpdateRelationRelatedTargetName(nameAndId[1])
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
        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }
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
        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }
        if (res.data) {
          this.GetNotes();
          this.GetNotesCount();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetNotes() {
    const data = {
      TargetID: this.props.id,
      SearchNotes: this.state.SearchNotes,
    };

    await API.post("/get_notes", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }
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
      SearchRelations: this.state.SearchRelations,
    };

    await API.post("/get_relations", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }
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
        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }
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
    this.setState((prevState) => ({
      NotesModal: !this.state.NotesModal,
      NewNote: {
        ...prevState.NewNote,
        title: "",
        text: "",
        type: "",
      },
    }));
  }

  RelationsModal() {
    this.setState({
      RelationsModal: !this.state.RelationsModal,
    });
  }

  SwitchSlider(slide) {
    switch (slide) {
      case "Notes":
        this.setState({
          NotesTab: 1,
          RelationsTab: 0,
          RelatedByTab: 0,
          SettingsTab: 0
        });
        break;

      case "Relations":
        this.setState({
          NotesTab: 0,
          RelationsTab: 1,
          RelatedByTab: 0,
          SettingsTab: 0
        });
        break;

      case "RelatedBy":
        this.setState({
          NotesTab: 0,
          RelationsTab: 0,
          RelatedByTab: 1,
          SettingsTab: 0
        });
        break;

      case "Settings":
        this.setState({
          NotesTab: 0,
          RelationsTab: 0,
          RelatedByTab: 0,
          SettingsTab: 1
        });
        break;

      default:
        break;
    }
  }

  async GetNotesCount() {
    const data = { TargetID: this.props.id };
    await API.post("/get_target_notes_count", data).then(async (respone) => {
      const res = respone.data;
      if (res.ErrorMessage) {
        window.alert(res.ErrorMessage);
      }
      if (res.data) {
        this.setState({ NotesCount: res.data[0].NotesCount });
      }
    });
  }

  setCurrentPage(page, type) {
    console.log(type);
    if (type === "notes") {
      this.setState({ currentPageNotes: page });
    } else if (type === "relations") {
      this.setState({ currentPageRelations: page });
    } else if (type === "relatedBy") {
      this.setState({ currentPageRelatedBy: page });
    }
  }

  componentDidMount() {
    this.GetTargetInfo();
    this.GetTargets();
    this.GetNotes();
    this.GetNotesCount();
    this.GetRelations();
    this.GetRelatedByTargets();
    this.GetImage();
    this.SetLastAccessedTarget();
  }

  render() {
    let lastNotesIndex =
      this.state.currentPageNotes * this.state.notesToDisplayNumber;
    let firstNotesIndex = lastNotesIndex - this.state.notesToDisplayNumber;
    const currentNotesToDisplay = this.state.notes.slice(
      firstNotesIndex,
      lastNotesIndex
    );

    let lastRelationsIndex =
      this.state.currentPageRelations * this.state.relationsToDisplayNumber;
    let firstRelationsIndex =
      lastRelationsIndex - this.state.relationsToDisplayNumber;
    const currentRelationsToDisplay = this.state.relations.slice(
      firstRelationsIndex,
      lastRelationsIndex
    );

    let lastRelatedByIndex =
      this.state.currentPageRelatedBy * this.state.relatedByToDisplayNumber;
    let firstRelatedByIndex =
      lastRelatedByIndex - this.state.relatedByToDisplayNumber;
    const currentRelatedByToDisplay = this.state.RelatedBY.slice(
      firstRelatedByIndex,
      lastRelatedByIndex
    );
    return (
      <div className="TargetProfile">
        {/* <ul className="OptionsContainer">
            <li style={{ width: "23%" }}>
              <a
                href={() => null}
                onClick={() => {
                  this.SettingsModal();
                }}
              >
                Settings{" "}
                <FontAwesomeIcon icon={faGear} style={{ marginLeft: "5px" }} />
              </a>{" "}
            </li>
            <li style={{ width: "23%" }}>
              <a
                href={() => null}
                onClick={() => {
                  this.switchSlider("Notes");
                }}
              >
                Notes{" "}
                <FontAwesomeIcon
                  icon={faNoteSticky}
                  style={{ marginLeft: "5px" }}
                />
              </a>
            </li>
            <li style={{ width: "27%" }}>
              <a
                href={() => null}
                onClick={() => {
                  this.switchSlider("Relations");
                }}
              >
                Relations{" "}
                <FontAwesomeIcon
                  icon={faPeopleArrows}
                  style={{ marginLeft: "5px" }}
                />
              </a>
            </li>
            <li style={{ width: "27%" }}>
              <a
                href={() => null}
                onClick={() => {
                  this.switchSlider("RelatedBy");
                }}
              >
                Related By{" "}
                <FontAwesomeIcon icon={faPerson} style={{ marginLeft: "5px" }} />
              </a>
            </li>
          </ul> */}
        <div className="TargetProfileContent">
          <div className="TargetProfileCardContainer">
            {
              this.state.id
              &&
              <TargetCardDashboard
                id={this.state.id}
                name={this.state.name}
                description={this.state.description}
                type={this.state.type}
                CreateDate={this.state.CreateDate}
                UpdateDate={this.state.UpdateDate}
                noButton
                width={100}
              />
            }
          </div>

          <div className="TargetProfileSlider">
            <div
              className="NotesSlide"
              style={{ display: this.state.NotesTab ? null : "none" }}
            >
              <div className="SearchContainer" style={{ margin: "0px", marginTop: "40px" }}>
                <div className="SearchInputContainer">
                  <input
                    placeholder="Search by name or description"
                    type="text"
                    className="Search"
                    onChange={this.UpdateSearchNotes}
                  />
                  <FiSearch size={25} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
                  <Dropdown style={{ width: "auto" }}>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      style={{ border: "none", backgroundColor: "transparent" }}
                    >
                      <img src={filterIcon} width={30} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item key="all" onClick={() => this.UpdateFilterNotes("all")}>
                        <span style={{ marginRight: "25px", color: "black" }}>
                          All
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item key="title" onClick={() => this.UpdateFilterNotes("title")}>
                        <span style={{ marginRight: "50px" }}>By Title</span>
                      </Dropdown.Item>
                      <Dropdown.Item key="date" onClick={() => this.UpdateFilterNotes("date")}>
                        <span style={{ marginRight: "50px" }}>By Date</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <ProfilesNavigationBar
                type="targetProfile"
                SwitchSlider={this.SwitchSlider}
                notesActive
              />
              <button className="NewNoteButton" onClick={this.NotesModal}>add new note</button>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                {currentNotesToDisplay.map((note, i) => {
                  return (
                    <NoteCard
                      key={i}
                      id={note.n_id}
                      title={note.n_title}
                      text={note.n_text}
                      type={note.n_type}
                      author={note.u_name}
                      CreateDate={note.n_create_date}
                      UpdateDate={note.n_update_date}
                      UserImage={note.u_image}
                      GetNotes={this.GetNotes}
                      GetNotesCount={this.GetNotesCount}
                    />
                  );
                })}
              </div>
              <Pagination
                type="notes"
                totalOperationsNumber={this.state.notes.length}
                postsToDisplayNumber={this.state.notesToDisplayNumber}
                setCurrentPage={this.setCurrentPage}
                currentPage={this.state.currentPageNotes}
              />
            </div>

            <div
              className="RelationSlide"
              style={{ display: this.state.RelationsTab ? null : "none" }}
            >
              <div className="SearchContainer" style={{ margin: "0px", marginTop: "40px" }}>
                <div className="SearchInputContainer">
                  <input
                    placeholder="Search by name or description"
                    type="text"
                    className="Search"
                    onChange={this.UpdateSearchRelations}
                  />
                  <FiSearch size={25} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
                  <Dropdown style={{ width: "auto" }}>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      style={{ border: "none", backgroundColor: "transparent" }}
                    >
                      <img src={filterIcon} width={30} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item key="all" onClick={() => this.UpdateFilterRelations("all")}>
                        <span style={{ marginRight: "25px", color: "black" }}>
                          All
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item key="name" onClick={() => this.UpdateFilterRelations("name")}>
                        <span style={{ marginRight: "50px" }}>By Name</span>
                      </Dropdown.Item>
                      <Dropdown.Item key="date" onClick={() => this.UpdateFilterRelations("date")}>
                        <span style={{ marginRight: "50px" }}>By Date</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <ProfilesNavigationBar
                type="targetProfile"
                SwitchSlider={this.SwitchSlider}
                relationsActive
              />
              <button className="NewRelationButton" onClick={this.RelationsModal}>add new relation</button>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {currentRelationsToDisplay.map((relation, i) => {
                  return (
                    <TargetCardDashboard
                      key={i}
                      id={relation.t_id}
                      name={relation.t_name}
                      description={relation.t_description}
                      type={relation.t_type}
                      relation={relation.r_type}
                      CreateDate={relation.t_create_date}
                      UpdateDate={relation.t_update_date}
                      width={100}
                    />
                  );
                })}
              </div>
              <Pagination
                type="relations"
                totalOperationsNumber={this.state.relations.length}
                postsToDisplayNumber={this.state.relationsToDisplayNumber}
                setCurrentPage={this.setCurrentPage}
                currentPage={this.state.currentPageRelations}
              />
            </div>

            <div
              className="RelatedBySlide"
              style={{ display: this.state.RelatedByTab ? null : "none" }}
            >
              {/* <div className="SearchContainer">
                <div>
                  <button disabled>Search</button>
                  <input
                    placeholder="Search by title or description"
                    type="text"
                    className="Search"
                    onChange={this.UpdateSearchRelatedByTargets}
                  />
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <button disabled>Sort by</button>
                  <select
                    className="Sort"
                    onChange={this.UpdateFilterRelatedByTargets}
                  >
                    <option value="all">All</option>
                    <option value="name">Name</option>
                    <option value="date">Date</option>
                  </select>
                </div>
              </div> */}
              <div className="SearchContainer" style={{ margin: "0px", marginTop: "40px" }}>
                <div className="SearchInputContainer">
                  <input
                    placeholder="Search by name or description"
                    type="text"
                    className="Search"
                    onChange={this.UpdateSearchRelatedByTargets}
                  />
                  <FiSearch size={25} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
                  <Dropdown style={{ width: "auto" }}>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      style={{ border: "none", backgroundColor: "transparent" }}
                    >
                      <img src={filterIcon} width={30} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item key="all" onClick={() => this.UpdateFilterRelatedByTargets("all")}>
                        <span style={{ marginRight: "25px", color: "black" }}>
                          All
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item key="name" onClick={() => this.UpdateFilterRelatedByTargets("name")}>
                        <span style={{ marginRight: "50px" }}>By Name</span>
                      </Dropdown.Item>
                      <Dropdown.Item key="date" onClick={() => this.UpdateFilterRelatedByTargets("date")}>
                        <span style={{ marginRight: "50px" }}>By Date</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <ProfilesNavigationBar
                type="targetProfile"
                SwitchSlider={this.SwitchSlider}
                relatedByActive
              />
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {currentRelatedByToDisplay.map((relation, i) => {
                  return (
                    <TargetCardDashboard
                      key={i}
                      id={relation.t_id}
                      name={relation.t_name}
                      description={relation.t_description}
                      type={relation.t_type}
                      relation={relation.r_type}
                      CreateDate={relation.t_create_date}
                      UpdateDate={relation.t_update_date}
                      width={100}
                    />
                  );
                })}
              </div>
              <Pagination
                type="relatedBy"
                totalOperationsNumber={this.state.RelatedBY.length}
                postsToDisplayNumber={this.state.relatedByToDisplayNumber}
                setCurrentPage={this.setCurrentPage}
                currentPage={this.state.currentPageRelatedBy}
              />
            </div>

            <div
              className="SettingsSlide"
              style={{ display: this.state.SettingsTab ? null : "none" }}
            >
              <div className="SearchContainer"></div>
              <ProfilesNavigationBar
                type="targetProfile"
                SwitchSlider={this.SwitchSlider}
                settingsActive
              />
              <div className="SettingsCard">
                <div className="SettingsCard-Content">
                  <div className="UpdateInfo">
                    <p className="UpdateInfo-Header">Update</p>
                    <p className="UpdateInfo-Body">You can update this target by clicking Update next to this text</p>
                    <button className="UpdateInfoButton" onClick={this.InfoModal}>update information</button>
                  </div>
                  <div className="DeleteOperation">
                    <p className="DeleteOperation-Header">Delete</p>
                    <p className="DeleteOperation-Body"> You can delete this target by clicking Delete next to this text</p>
                    <button className="DeleteOperationButton" onClick={this.DeleteModal}>delete target</button>
                  </div>
                </div>
              </div>
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
              <div className="ModalButtons">
                <button
                  className="OkButton"
                  onClick={() => {
                    this.UploadNote();
                    this.NotesModal();
                  }}
                >Save Note</button>
                <button className="CancelButton" onClick={this.NotesModal}>Cancel</button>
              </div>
            </Modal.Body>
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

                {/* <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {this.state.NewRelation.RelatedTargetName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {this.state.targets.map((target, i) => {
                      return (
                        <Dropdown.Item
                          key={i}
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
                </Dropdown> */}
                <Form.Group>
                  <Form.Label>Related Type</Form.Label>
                  <Form.Select
                    onChange={this.UpdateRelationRelatedTarget}
                  >
                    {this.state.targets.map((target, i) => {
                      return (
                        <option
                          key={i}
                          value={`${target.t_id} ${target.t_name}`}
                        >
                          {target.t_name}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label style={{ marginTop: "1rem" }}>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={this.UpdateRelationDescription}
                  />
                </Form.Group>
              </Form>
              <div className="ModalButtons">
                <button
                  className="OkButton"
                  onClick={() => {
                    this.UploadRelation();
                    this.RelationsModal();
                  }}
                >Save Relation</button>
                <button className="CancelButton" onClick={this.RelationsModal}>Cancel</button>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={this.state.InfoModal} onHide={this.InfoModal}>
            <Modal.Header closeButton>
              <Modal.Title>New Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Target Name</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={this.UpdateNewInfoName}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Target Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    autoFocus
                    onChange={this.UpdateNewInfoDescription}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Target Location</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={this.UpdateNewInfoLocation}
                  />
                </Form.Group>
              </Form>
              <div className="ModalButtons">
                <button
                  className="OkButton"
                  onClick={() => {
                    this.UploadNewInfo();
                    this.InfoModal();
                  }}
                >Save</button>
                <button className="CancelButton" onClick={this.InfoModal}>Cancel</button>
              </div>
            </Modal.Body>
          </Modal>

          <Modal show={this.state.DeleteModal} onHide={this.DeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Operation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <p>Are you sure you want to delete this Target?</p>
              </Form>
              <div className="ModalButtons">
                <button
                  className="DeleteButton"
                  onClick={() => {
                    this.DeleteTarget();
                    this.DeleteModal();
                  }}
                >Delete</button>
                <button className="CancelButton" onClick={this.DeleteModal}>Cancel</button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div >
    );
  }
}

export default withParams(TargetProfile);
