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
  faBullseye,
  faAddressCard,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FiSearch } from "react-icons/fi"
import filterIcon from "../icons/Filter.svg"
import { FileUploader } from "react-drag-drop-files";

// components
import TargetCard from "../components/TargetCard";
import Post from "../components/Post";
import TaskCard from "../components/TaskCard";
import API from "../helper/API";
import Pagination from "../components/Pagination";
import OperationCardDashboard from "../components/OperationCardDashboard";
import ProfilesNavigationBar from "../components/ProfilesNavigationBar";
import Operations from "./Operations";

const fileTypes = ["PDF", "PNG", "GIF", "JPEG", "TIFF", "PSD", "EPS", "AI"];


const withParams = (Component) => (props) => {
  const { id } = useParams();
  return <Component {...props} id={id} />;
};

class OperationProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      image: "",
      state: "",
      description: "",
      CreateDate: "",
      PostsFilter: "",
      TargetsFilter: "",
      TasksFilter: "",
      FilterPosts: "",
      FilterTargets: "",
      FilterTasks: "",
      SearchTasks: "",
      SearchTargets: "",
      SearchPosts: "",
      TargetsCount: 0,
      PostsCount: 0,
      MembersCount: 0,
      posts: [],
      targets: [],
      tasks: [],
      members: [],
      PostsTab: true,
      TargetsTab: false,
      TasksTab: false,
      MembersTab: false,
      SettingsTab: false,
      PostModal: false,
      TargetModal: false,
      TaskModal: false,
      MemberModal: false,
      SettingsModal: false,
      DeleteModal: false,
      StateModal: false,
      currentPageTargets: 1,
      targetsToDisplayNumber: 4,
      currentPageTasks: 1,
      tasksToDisplayNumber: 4,
      NewTarget: {
        name: "",
        Base64State: "",
        FileName: "",
        type: "Target Type",
        description: "",
        location: "",
      },
      NewPost: {
        title: "",
        text: "",
      },
      NewTask: {
        AgentName: "Ahmad Aalmuhidat",
        title: "",
        agent: "c694568f-d",
        state: "To Do",
        description: "",
      },
      NewMember: {
        agent: "",
      },
      NewInfo: {
        name: "",
        description: "",
      },
    };

    // Helping
    this.SwitchSlider = this.SwitchSlider.bind(this);
    this.convertToBase64 = this.convertToBase64.bind(this);

    // Modals
    this.PostModal = this.PostModal.bind(this);
    this.TargetModal = this.TargetModal.bind(this);
    this.TaskModal = this.TaskModal.bind(this);
    // this.SettingsModal = this.SettingsModal.bind(this);
    this.MemberModal = this.MemberModal.bind(this);
    this.DeleteModal = this.DeleteModal.bind(this);
    this.StateModal = this.StateModal.bind(this);
    this.InfoModal = this.InfoModal.bind(this);

    // Fetching
    this.GetOperationInfo = this.GetOperationInfo.bind(this);
    this.GetPosts = this.GetPosts.bind(this);
    this.GetTargets = this.GetTargets.bind(this);
    this.GetMembers = this.GetMembers.bind(this);
    this.GetTasks = this.GetTasks.bind(this);
    this.GetImage = this.GetImage.bind(this);
    this.GetPostsCount = this.GetPostsCount.bind(this);
    this.GetTargetsCount = this.GetTargetsCount.bind(this);
    this.GetMembersCount = this.GetMembersCount.bind(this);

    // Deleteing
    this.DeleteOperation = this.DeleteOperation.bind(this);

    // Uploading
    this.UploadTarget = this.UploadTarget.bind(this);
    this.UploadPost = this.UploadPost.bind(this);
    this.UploadTask = this.UploadTask.bind(this);
    this.UploadMemeber = this.UploadMemeber.bind(this);
    this.UploadNewInfo = this.UploadNewInfo.bind(this);
    this.SetLastAccessedOperation = this.SetLastAccessedOperation.bind(this);

    // Updating
    this.UpdateTaskMember = this.UpdateTaskMember.bind(this);
    this.UpdateTargetName = this.UpdateTargetName.bind(this);
    this.UpdateTargetType = this.UpdateTargetType.bind(this);
    this.UpdateTargetDescription = this.UpdateTargetDescription.bind(this);
    this.UpdateTargetLocation = this.UpdateTargetLocation.bind(this);
    this.UpdatePostTitle = this.UpdatePostTitle.bind(this);
    this.UpdatePostText = this.UpdatePostText.bind(this);
    this.UpdateTaskTitle = this.UpdateTaskTitle.bind(this);
    this.UpdateTaskDescription = this.UpdateTaskDescription.bind(this);
    this.UpdateTaskState = this.UpdateTaskState.bind(this);
    this.UpdateMemberID = this.UpdateMemberID.bind(this);
    this.UpdateBase64 = this.UpdateBase64.bind(this);
    this.UpdateFileName = this.UpdateFileName.bind(this);
    this.UpdateFilterPosts = this.UpdateFilterPosts.bind(this);
    this.UpdateFilterTargets = this.UpdateFilterTargets.bind(this);
    this.UpdateFilterTasks = this.UpdateFilterTasks.bind(this);
    this.UpdatesearchTask = this.UpdatesearchTask.bind(this);
    this.UpdateSearchTargets = this.UpdateSearchTargets.bind(this);
    this.UpdateSearchPosts = this.UpdateSearchPosts.bind(this);
    this.UpdateOperationState = this.UpdateOperationState.bind(this);
    this.UpdateNewInfoName = this.UpdateNewInfoName.bind(this);
    this.UpdateNewInfoDescription = this.UpdateNewInfoDescription.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  async SetLastAccessedOperation() {
    const data = {
      OperationID: this.props.id,
    };

    await API.post("/set_last_accessed_operation", data)
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
      },
    }));
  }

  async UploadNewInfo() {
    const data = {
      OperationID: this.props.id,
      OperationName: this.state.NewInfo.name,
      OperationDescription: this.state.NewInfo.description,
    };

    await API.post("/update_operation_info", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.GetOperationInfo();
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

  async UpdateOperationState(event) {
    let OperationState;
    if (event.target.checked === false) {
      this.setState({ state: "inactive" })
      OperationState = "inactive"
    } else {
      this.setState({ state: "active" })
      OperationState = "active"
    }
    console.log(event.target.checked)
    const data = {
      OperationID: this.props.id,
      OperationState: OperationState,
    };

    await API.post("/update_operation_state", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.GetOperationInfo();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async DeleteOperation() {
    const data = {
      OperationID: this.props.id,
    };

    await API.post("/remove_operation", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          window.location = "/operations";
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  DeleteModal() {
    this.setState({ DeleteModal: !this.state.DeleteModal });
  }

  StateModal() {
    this.setState({ StateModal: !this.state.StateModal });
  }

  async UpdateSearchPosts(event) {
    await this.setState({ SearchPosts: event.target.value });
    this.GetPosts();
  }

  async UpdateSearchTargets(event) {
    await this.setState({ SearchTargets: event.target.value });
    this.GetTargets();
  }

  async UpdatesearchTask(event) {
    await this.setState({ SearchTasks: event.target.value });
    this.GetTasks();
  }

  async UpdateFilterPosts(value) {
    if (value === "all") {
      await this.GetPosts();
    }

    if (value === "newest_to_older") {
      await this.GetPosts();
      await this.setState({ FilterPosts: value });
      let filteredArray = this.state.posts.sort((a, b) => {
        var c = new Date(a.p_create_date);
        var d = new Date(b.p_create_date);
        return d - c;
      });
      await this.setState({ posts: filteredArray });
    }

    if (value === "older_to_newest") {
      await this.GetPosts();
      await this.setState({ FilterPosts: value });
      let filteredArray = this.state.posts.sort((a, b) => {
        var c = new Date(a.p_create_date);
        var d = new Date(b.p_create_date);
        return c - d;
      });
      await this.setState({ posts: filteredArray });
    }
  }

  async UpdateFilterTargets(value) {
    if (value === "all") {
      await this.GetTargets();
    }

    if (value === "date") {
      await this.GetTargets();
      await this.setState({ FilterTargets: value });
      let filteredArray = this.state.targets.sort((a, b) => {
        var c = new Date(a.t_create_date);
        var d = new Date(b.t_create_date);
        return c - d;
      });
      await this.setState({ targets: filteredArray });
    }

    if (value === "name") {
      await this.GetTargets();
      await this.setState({ FilterTargets: value });
      let filteredArray = this.state.targets.sort((a, b) => {
        return a.t_name.localeCompare(b.t_name);
      });
      await this.setState({ targets: filteredArray });
    }
  }

  async UpdateFilterTasks(value) {
    if (value === "all") {
      await this.GetTasks();
    }

    if (value === "older_to_newest") {
      await this.GetTasks();
      await this.setState({ FilterTasks: value });
      let filteredArray = this.state.tasks.sort((a, b) => {
        var c = new Date(a.tk_create_date);
        var d = new Date(b.tk_create_date);
        return c - d;
      });
      await this.setState({ tasks: filteredArray });
    }

    if (value === "my_tasks") {
      const data = {
        TaskOperation: this.props.id,
        Token: window.sessionStorage.getItem("token"),
      };

      await API.post("/get_tasks_by_agent", data)
        .then((respone) => {
          const res = respone.data;

          if (res.ErrorMessage) {
            window.alert(res.ErrorMessage);
          }

          if (res.data) {
            this.setState({ tasks: res.data });
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  UpdateFileName(FileName) {
    this.setState((prevState) => ({
      NewTarget: {
        ...prevState.NewTarget,
        FileName: FileName,
      },
    }));
  }

  UpdateBase64(base64) {
    window.localStorage.setItem("base64", base64);
  }

  convertToBase64(file) {

    //Check File is not Empty
    if (file) {

      // FileReader function for read the file.
      const fileReader = new FileReader();
      var self = this;

      // Onload of file read the file content
      fileReader.onload = async function (fileLoadedEvent) {
        let base64 = fileLoadedEvent.target.result;
        let fileName = file.name;
        self.UpdateBase64(base64);
        self.UpdateFileName(fileName);
      };
      // // Convert data to base64
      fileReader.readAsDataURL(file);
    }
  }

  async GetPostsCount() {
    const data = { OperationID: this.props.id };
    await API.post("/get_operation_posts_count", data).then(async (respone) => {
      const res = respone.data;

      if (res.ErrorMessage) {
        window.alert(res.ErrorMessage);
      }

      if (res.data) {
        this.setState({ PostsCount: res.data[0].PostsCount });
      }
    });
  }

  async GetTargetsCount() {
    const data = { OperationID: this.props.id };
    await API.post("/get_operation_targets_count", data).then(
      async (respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({ TargetsCount: res.data[0].TargetsCount });
        }
      }
    );
  }

  async GetMembersCount() {
    const data = { OperationID: this.props.id };
    await API.post("/get_operation_members_count", data).then(
      async (respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({ MembersCount: res.data[0].MembersCount });
        }
      }
    );
  }

  async GetImage() {
    const data = { OperationID: this.props.id };
    await API.post("/get_operation_image", data).then(async (respone) => {
      const res = respone.data;

      if (res.ErrorMessage) {
        window.alert(res.ErrorMessage);
      }

      if (res.data === false || res.data.o_image === "") {
        this.setState({
          image:
            "https://img.freepik.com/free-vector/neon-cyber-security-concept-with-padlock-circuit_23-2148536303.jpg?w=900&t=st=1660930843~exp=1660931443~hmac=efcef9e6d44df72e8f8d1f679f29b28823bd0313b2a61eefecbda97b8622878d",
        });
      } else {
        this.setState({ image: res.data.o_image });
      }
    });
  }

  // SettingsModal() {
  //   this.setState({ SettingsModal: !this.state.SettingsModal });
  // }

  async UploadMemeber() {
    const data = {
      MemeberAgent: this.state.NewMember.agent,
      MemeberOperation: this.props.id,
      Token: window.sessionStorage.getItem("token"),
    };

    await API.post("/add_member", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.GetMembers();
          this.GetMembersCount();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  MemberModal() {
    this.setState((prevState) => ({
      MemberModal: !this.state.MemberModal,
      NewMember: {
        ...prevState.NewMember,
        agent: "",
      },
    }));
  }

  UpdateMemberID(event) {
    this.setState((prevState) => ({
      NewMember: {
        ...prevState.NewMember,
        agent: event.target.value,
      },
    }));
  }

  UpdateTaskState(event) {
    this.setState((prevState) => ({
      NewTask: {
        ...prevState.NewTask,
        state: event.target.value,
      },
    }));
  }

  UpdateTaskMember(event) {
    const stringArray = event.target.value.split(' ')
    const nameAndId = [stringArray[0], stringArray.splice(1).join(' ')]
    this.setState((prevState) => ({
      NewTask: {
        ...prevState.NewTask,
        agent: nameAndId[0],
        AgentName: nameAndId[1],
      },
    }));
  }

  UpdateTaskTitle(event) {
    this.setState((prevState) => ({
      NewTask: {
        ...prevState.NewTask,
        title: event.target.value,
      },
    }));
  }

  UpdateTaskDescription(event) {
    this.setState((prevState) => ({
      NewTask: {
        ...prevState.NewTask,
        description: event.target.value,
      },
    }));
  }

  async UploadTask() {
    const data = {
      Token: window.sessionStorage.getItem("token"),
      TaskAgent: this.state.NewTask.agent,
      TaskTitle: this.state.NewTask.title,
      TaskContent: this.state.NewTask.description,
      TaskState: this.state.NewTask.state,
      TaskOperation: this.props.id,
    };

    await API.post("/add_task", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.GetTasks();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetMembers() {
    const data = {
      OperationID: this.props.id,
    };

    await API.post("/get_members", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({
            members: res.data,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  UpdateTargetName(event) {
    this.setState((prevState) => ({
      NewTarget: {
        ...prevState.NewTarget,
        name: event.target.value,
      },
    }));
  }

  UpdateTargetType(event) {
    this.setState((prevState) => ({
      NewTarget: {
        ...prevState.NewTarget,
        type: event.target.value,
      },
    }));
  }

  UpdateTargetDescription(event) {
    this.setState((prevState) => ({
      NewTarget: {
        ...prevState.NewTarget,
        description: event.target.value,
      },
    }));
  }

  UpdateTargetLocation(event) {
    this.setState((prevState) => ({
      NewTarget: {
        ...prevState.NewTarget,
        location: event.target.value,
      },
    }));
  }

  UpdatePostTitle(event) {
    this.setState((prevState) => ({
      NewPost: {
        ...prevState.NewPost,
        title: event.target.value,
      },
    }));
  }

  UpdatePostText(event) {
    this.setState((prevState) => ({
      NewPost: {
        ...prevState.NewPost,
        text: event.target.value,
      },
    }));
  }

  async GetOperationInfo() {
    const data = {
      OperationID: this.props.id,
    };
    await API.post("/get_operation_info", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({
            id: res.data[0].o_id,
            name: res.data[0].o_name,
            state: res.data[0].o_state,
            description: res.data[0].o_description,
            CreateDate: res.data[0].o_create_date,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetPosts() {
    const data = {
      OperationID: this.props.id,
      search: this.state.SearchPosts,
      Token: window.sessionStorage.getItem("token")
    };
    await API.post("/get_posts", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({ posts: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetTargets() {
    const data = {
      OperationID: this.props.id,
      search: this.state.SearchTargets,
    };

    await API.post("/get_targets", data)
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

  async GetTasks() {
    const data = {
      OperationID: this.props.id,
      search: this.state.SearchTasks,
    };

    await API.post("/get_tasks", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({ tasks: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  PostModal() {
    this.setState((prevState) => ({
      PostModal: !this.state.PostModal,
      NewPost: {
        ...prevState.NewPost,
        title: "",
        text: "",
      },
    }));
  }

  TargetModal() {
    this.setState((prevState) => ({
      TargetModal: !this.state.TargetModal,
      NewTarget: {
        ...prevState.NewTarget,
        name: "",
        Base64State: "",
        FileName: "",
        type: "Target Type",
        description: "",
        location: "",
      },
    }));
  }

  TaskModal() {
    this.setState((prevState) => ({
      TaskModal: !this.state.TaskModal,
      NewTask: {
        ...prevState.NewTask,
        title: "",
        state: "To Do",
        description: "",
      },
    }));
  }

  SwitchSlider(slide) {
    switch (slide) {
      case "Notes":
        this.setState({
          PostsTab: true,
          TargetsTab: false,
          TasksTab: false,
          MembersTab: false,
          SettingsTab: false
        });
        break;

      case "Targets":
        this.setState({
          PostsTab: false,
          TargetsTab: true,
          TasksTab: false,
          MembersTab: false,
          SettingsTab: false
        });
        break;

      case "Tasks":
        this.setState({
          PostsTab: false,
          TargetsTab: false,
          TasksTab: true,
          MembersTab: false,
          SettingsTab: false
        });
        break;

      case "Members":
        this.setState({
          PostsTab: false,
          TargetsTab: false,
          TasksTab: false,
          MembersTab: true,
          SettingsTab: false
        })
        break

      case "Settings":
        this.setState({
          PostsTab: false,
          TargetsTab: false,
          TasksTab: false,
          MembersTab: false,
          SettingsTab: true
        })
        break

      default:
        break;
    }
  }

  async UploadTarget() {
    const data = {
      TargetOperation: this.props.id,
      Token: window.sessionStorage.getItem("token"),
      TargetName: this.state.NewTarget.name,
      TargetType: this.state.NewTarget.type,
      TargetImage: "",
      TargetDescription: this.state.NewTarget.description,
      TargetLocation: this.state.NewTarget.location,
      Base64State: window.localStorage.getItem("base64"),
      FileName: this.state.NewTarget.FileName,
    };
    await API.post("/add_target", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.GetTargets();
          this.GetTargetsCount();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async UploadPost() {
    const data = {
      Token: window.sessionStorage.getItem("token"),
      PostTitle: this.state.NewPost.title,
      PostText: this.state.NewPost.text,
      PostImage: "",
      PostOperation: this.props.id,
    };
    await API.post("/add_post", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }
        if (res.data) {
          this.GetPosts();
          this.GetPostsCount();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  setCurrentPage(page, type) {
    if (type === "tasks") {
      this.setState({ currentPageTasks: page });
    } else if (type === "targets") {
      this.setState({ currentPageTargets: page });
    }
  }

  componentDidMount() {
    this.GetOperationInfo();
    this.GetPosts();
    this.GetTargets();
    this.GetTasks();
    this.GetMembers();
    this.GetImage();
    this.GetPostsCount();
    this.GetTargetsCount();
    this.GetMembersCount();
    this.SetLastAccessedOperation();
  }

  render() {
    let lastTargetsIndex =
      this.state.currentPageTargets * this.state.targetsToDisplayNumber;
    let firstTargetsIndex =
      lastTargetsIndex - this.state.targetsToDisplayNumber;
    const currentTargetsToDisplay = this.state.targets.slice(
      firstTargetsIndex,
      lastTargetsIndex
    );
    let lastTasksIndex =
      this.state.currentPageTasks * this.state.tasksToDisplayNumber;
    let firstTasksIndex = lastTasksIndex - this.state.tasksToDisplayNumber;
    const currentTasksToDisplay = this.state.tasks.slice(
      firstTasksIndex,
      lastTasksIndex
    );
    return (
      <div className="OperationProfile">
        <div className="OperationProfileContent">
          {
            this.state.id !== "" &&
            (
              <OperationCardDashboard
                key={1}
                id={this.state.id}
                name={this.state.name}
                description={this.state.description}
                status={this.state.state}
                CreateDate={this.state.CreateDate}
                width={100}
                noButton
              />
            )
          }
          <div
            className="PostsSlide"
          >
            <div className="OperationProfileSlider" style={{ display: this.state.PostsTab ? null : "none" }}>
              <div className="SearchContainer" style={{ margin: "0px", marginTop: "40px" }}>
                <div className="SearchInputContainer">
                  <input
                    placeholder="Search by name or description"
                    type="text"
                    className="Search"
                    onChange={this.UpdateSearchPosts}
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
                      <img src={filterIcon} width={22} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item key="all" onClick={() => this.UpdateFilterPosts("all")}>
                        <span style={{ marginRight: "25px", color: "black" }}>
                          All
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item key="newest_to_older" onClick={() => this.UpdateFilterPosts("newest_to_older")}>
                        <span style={{ marginRight: "50px" }}>newst to older</span>
                      </Dropdown.Item>
                      <Dropdown.Item key="older_to_newest" onClick={() => this.UpdateFilterPosts("older_to_newest")}>
                        <span style={{ marginRight: "50px" }}>older to newst</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <ProfilesNavigationBar
                type="operationProfile"
                SwitchSlider={this.SwitchSlider}
                postsActive
              />
              <button className="NewPostButton" onClick={this.PostModal}>add new post</button>
              {this.state.posts.map((post, i) => {
                return (
                  <Post
                    key={i}
                    id={post.p_id}
                    title={post.p_title}
                    text={post.p_text}
                    author={post.u_name}
                    createDate={post.p_create_date}
                    UserImage={post.u_image}
                    GetPosts={this.GetPosts}
                    GetPostsCount={this.GetPostsCount}
                  />
                );
              })}
            </div>

            <div
              className="TargetsSlide"
              style={{ display: this.state.TargetsTab ? null : "none" }}
            >
              <div className="SearchContainer" style={{ margin: "0px" }}>
                <div className="SearchInputContainer">
                  <input
                    placeholder="Search by name or description"
                    type="text"
                    className="Search"
                    onChange={this.UpdateSearchTargets}
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
                      <img src={filterIcon} width={22} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item key="all" onClick={() => this.UpdateFilterTargets("all")}>
                        <span style={{ marginRight: "25px", color: "black" }}>
                          All
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item key="name" onClick={() => this.UpdateFilterTargets("name")}>
                        <span style={{ marginRight: "50px" }}>By Name</span>
                      </Dropdown.Item>
                      <Dropdown.Item key="date" onClick={() => this.UpdateFilterTargets("date")}>
                        <span style={{ marginRight: "50px" }}>By Date</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <ProfilesNavigationBar
                type="operationProfile"
                SwitchSlider={this.SwitchSlider}
                targetsActive
              />
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                <button className="NewTargetButton" onClick={this.TargetModal}>add new target</button>
                {currentTargetsToDisplay.map((target, i) => {
                  return (
                    <TargetCard
                      key={i}
                      id={target.t_id}
                      name={target.t_name}
                      description={target.t_description}
                      type={target.t_type}
                      CreateDate={target.t_create_date}
                      UpdateDate={target.t_update_date}
                    />
                  );
                })}
              </div>
              <Pagination
                type="targets"
                totalOperationsNumber={this.state.targets.length}
                postsToDisplayNumber={this.state.targetsToDisplayNumber}
                setCurrentPage={this.setCurrentPage}
                currentPage={this.state.currentPageTargets}
              />
            </div>

            <div
              className="TasksSlide"
              style={{ display: this.state.TasksTab ? null : "none" }}
            >
              <div className="SearchContainer" style={{ margin: "0px", marginTop: "40px" }}>
                <div className="SearchInputContainer">
                  <input
                    placeholder="Search by name or description"
                    type="text"
                    className="Search"
                    onChange={this.UpdatesearchTask}
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
                      <img src={filterIcon} width={22} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item key="all" onClick={() => this.UpdateFilterTasks("all")}>
                        <span style={{ marginRight: "25px", color: "black" }}>
                          All
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item key="older_to_newest" onClick={() => this.UpdateFilterTasks("older_to_newest")}>
                        <span style={{ marginRight: "50px" }}>Older to newst</span>
                      </Dropdown.Item>
                      <Dropdown.Item key="my_tasks" onClick={() => this.UpdateFilterTasks("my_tasks")}>
                        <span style={{ marginRight: "50px" }}>My Tasks</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <ProfilesNavigationBar
                type="operationProfile"
                SwitchSlider={this.SwitchSlider}
                tasksActive
              />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "start",
                }}
              >
                <button className="NewTaskButton" onClick={this.TaskModal}>add new task</button>
                {currentTasksToDisplay.map((task, i) => {
                  return (
                    <TaskCard
                      key={i}
                      id={task.tk_id}
                      title={task.tk_title}
                      state={task.tk_state}
                      text={task.tk_content}
                      agent={task.u_name}
                      UserImage={task.u_image}
                      refresh={this.GetTasks}
                      CreateDate={task.tk_create_date}
                      UpdateDate={task.tk_update_date}
                    />
                  );
                })}
              </div>
              <Pagination
                type="tasks"
                totalOperationsNumber={this.state.tasks.length}
                postsToDisplayNumber={this.state.tasksToDisplayNumber}
                setCurrentPage={this.setCurrentPage}
                currentPage={this.state.currentPageTasks}
              />
            </div>
          </div>

          <div
            className="MembersSlide"
            style={{ display: this.state.MembersTab ? null : "none" }}
          >
            <ProfilesNavigationBar
              type="operationProfile"
              SwitchSlider={this.SwitchSlider}
              membersActive
            />
            <div className="MembersContainer">
              {
                this.state.members.map((member, i) => {
                  return (
                    <div className="profileCardInfoContainer" key={i}>
                      <div className="profileCardInfo">
                        <label htmlFor="inputFile" id="labelInputFile">
                          <img
                            src={member.u_image}
                            alt="user-card"
                            className="profileCardInfo-image"
                          />
                        </label>
                        <div className="profileCardInfo-content">
                          <p>{member.u_name}</p>
                          <p>User ID: <div style={{ marginLeft: "5px", display: "inline-block" }}>{member.u_id}</div></p>
                          <p>{member.u_email}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div
            className="SettingsSlide"
            style={{ display: this.state.SettingsTab ? null : "none" }}
          >
            <ProfilesNavigationBar
              type="operationProfile"
              SwitchSlider={this.SwitchSlider}
              settingsActive
            />
            <div className="SettingsCard">
              <h1 className="SettingsCard-Header">Settings</h1>
              <div className="SettingsCard-Content">
                <div className="AddMember">
                  <p className="AddMember-Header">Add member</p>
                  <p className="AddMember-Body">You can add a member to this target by clicking Add next to this text</p>
                  <button className="NewMemberButton" onClick={this.MemberModal}>new member</button>
                </div>
                <hr />
                <div className="SwitchState">
                  <div>
                    <p className="SwitchState-Header">Switch state</p>
                    <p className="SwitchState-Body">You can switch the activity of this target by clicking
                      Switch state next to this text</p>
                  </div>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="SwitchState-SwitchButton"
                      checked={this.state.state === "active" ? true : false}
                      onChange={this.UpdateOperationState}
                    />
                  </Form>
                </div>
                <div className="UpdateInfo">
                  <p className="UpdateInfo-Header">Update</p>
                  <p className="UpdateInfo-Body">You can update this target by clicking Update next to this text</p>
                  <button className="UpdateInfoButton" onClick={this.InfoModal}>update information</button>
                </div>
                <hr />
                <div className="DeleteOperation">
                  <p className="DeleteOperation-Header">Delete</p>
                  <p className="DeleteOperation-Body"> You can delete this target by clicking Delete next to this text</p>
                  <button className="DeleteOperationButton" onClick={this.DeleteModal}>delete operation</button>
                </div>
              </div>
            </div>
          </div>

          <Modal show={this.state.PostModal} onHide={this.PostModal}>
            <Modal.Header closeButton>
              <Modal.Title>New Post</Modal.Title>
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
                    onChange={this.UpdatePostTitle}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={this.UpdatePostText}
                  />
                </Form.Group>
              </Form>
              <div className="ModalButtons">
                <button
                  className="OkButton"
                  onClick={() => {
                    this.UploadPost();
                    this.PostModal();
                  }}
                >Save Post</button>
                <button className="CancelButton" onClick={this.PostModal}>Cancel</button>
              </div>
            </Modal.Body>
          </Modal>

          <Modal show={this.state.TargetModal} onHide={this.TargetModal}>
            <Modal.Header closeButton>
              <Modal.Title>New Target</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={this.UpdateTargetName}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="about the target"
                    rows={3}
                    onChange={this.UpdateTargetDescription}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={this.UpdateTargetLocation}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>target type</Form.Label>
                  <Form.Select
                    onChange={this.UpdateTargetType}
                  >
                    <option value="server">Server</option>
                    <option value="individual">Individual</option>
                    <option value="organization">Organization</option>
                    <option value="service">Service</option>
                    <option value="website">Website</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
                <div className="dragAndDrop">
                  <p>Target Image</p>
                  <FileUploader handleChange={this.convertToBase64} name="file" types={fileTypes} />
                </div>
              </Form>
              <div className="ModalButtons">
                <button
                  className="OkButton"
                  onClick={() => {
                    this.UploadTarget();
                    this.TargetModal();
                  }}
                >Save Target</button>
                <button className="CancelButton" onClick={this.TargetModal}>Cancel</button>
              </div>
            </Modal.Body>
          </Modal>

          <Modal show={this.state.TaskModal} onHide={this.TaskModal}>
            <Modal.Header closeButton>
              <Modal.Title>New Task</Modal.Title>
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
                    onChange={this.UpdateTaskTitle}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={this.UpdateTaskDescription}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 dropdownTask"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Group>
                    <Form.Label>target type</Form.Label>
                    <Form.Select onChange={this.UpdateTaskMember}>
                      {this.state.members.map((member, i) => {
                        return (
                          <option
                            key={i}
                            value={`${member.u_id} ${member.u_name}`}
                          >
                            {member.u_name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group style={{ marginTop: "20px" }}>
                    <Form.Select onChange={this.UpdateTaskState}>
                      <option value="to do">To Do</option>
                      <option value="in progress">In Progress</option>
                      <option value="done">Done</option>
                    </Form.Select>
                  </Form.Group>
                </Form.Group>
              </Form>
              <div className="ModalButtons">
                <button
                  className="OkButton"
                  onClick={() => {
                    this.UploadTask();
                    this.TaskModal();
                  }}
                >Save Task</button>
                <button className="CancelButton" onClick={this.TaskModal}>Cancel</button>
              </div>
            </Modal.Body>
          </Modal>

          <Modal show={this.state.MemberModal} onHide={this.MemberModal}>
            <Modal.Header closeButton>
              <Modal.Title>New Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={this.UpdateMemberID}
                  />
                </Form.Group>
              </Form>
              <div className="ModalButtons">
                <button
                  className="OkButton"
                  onClick={() => {
                    this.UploadMemeber();
                    this.MemberModal();
                  }}
                >Add</button>
                <button className="CancelButton" onClick={this.MemberModal}>Cancel</button>
              </div>
            </Modal.Body>
          </Modal>

          <Modal show={this.state.DeleteModal} onHide={this.DeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Operation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <p>Are you sure you want to delete this Operation?</p>
              </Form>
              <div className="ModalButtons">
                <button
                  className="DeleteButton"
                  onClick={() => {
                    this.DeleteOperation();
                    this.DeleteModal();
                  }}
                >Delete</button>
                <button className="CancelButton" onClick={this.DeleteModal}>Cancel</button>
              </div>
            </Modal.Body>
          </Modal>

          <Modal show={this.state.StateModal} onHide={this.StateModal}>
            <Modal.Header closeButton>
              <Modal.Title>State</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Switch State</Form.Label>
                  <Form.Select
                    className="Sort"
                    onChange={this.UpdateOperationState}
                    aria-label="Default select example"
                  >
                    <option selected disabled>
                      State
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.StateModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.InfoModal} onHide={this.InfoModal}>
            <Modal.Header closeButton>
              <Modal.Title>Update Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Operation Name</Form.Label>
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
                  <Form.Label>Operation Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={this.UpdateNewInfoDescription}
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
        </div>
      </div >
    );
  }
}

export default withParams(OperationProfile);
