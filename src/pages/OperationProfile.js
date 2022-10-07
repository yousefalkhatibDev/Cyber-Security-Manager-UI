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

// components
import TargetCard from "../components/TargetCard";
import Post from "../components/Post";
import TaskCard from "../components/TaskCard";
import API from "../helper/API";

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
      PostModal: false,
      TargetModal: false,
      TaskModal: false,
      MemberModal: false,
      SettingsModal: false,
      DeleteModal: false,
      StateModal: false,
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
        AgentName: "Assign To",
        title: "",
        agent: "",
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
    this.SettingsModal = this.SettingsModal.bind(this);
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
  }

  InfoModal() {
    this.setState({ InfoModal: !this.state.InfoModal });
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
    const data = {
      OperationID: this.props.id,
      OperationState: event.target.value,
    };

    await API.post("/update_operation_state", data)
      .then((respone) => {
        const res = respone.data;
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

  async UpdateFilterPosts(event) {
    if (event.target.value === "all") {
      await this.GetPosts();
    }

    if (event.target.value === "newest_to_older") {
      await this.GetPosts();
      await this.setState({ FilterPosts: event.target.value });
      let filteredArray = this.state.posts.sort((a, b) => {
        var c = new Date(a.p_create_date);
        var d = new Date(b.p_create_date);
        return c - d;
      });
      await this.setState({ posts: filteredArray });
    }

    if (event.target.value === "older_to_newest") {
      await this.GetPosts();
      await this.setState({ FilterPosts: event.target.value });
      let filteredArray = this.state.posts.sort((a, b) => {
        var c = new Date(a.p_create_date);
        var d = new Date(b.p_create_date);
        return d - c;
      });
      await this.setState({ posts: filteredArray });
    }
  }

  async UpdateFilterTargets(event) {
    if (event.target.value === "all") {
      await this.GetTargets();
    }

    if (event.target.value === "date") {
      await this.GetTargets();
      await this.setState({ FilterTargets: event.target.value });
      let filteredArray = this.state.targets.sort((a, b) => {
        var c = new Date(a.t_create_date);
        var d = new Date(b.t_create_date);
        return c - d;
      });
      await this.setState({ targets: filteredArray });
    }

    if (event.target.value === "name") {
      await this.GetTargets();
      await this.setState({ FilterTargets: event.target.value });
      let filteredArray = this.state.targets.sort((a, b) => {
        return a.t_name.localeCompare(b.t_name);
      });
      await this.setState({ targets: filteredArray });
    }
  }

  async UpdateFilterTasks(event) {
    if (event.target.value === "all") {
      await this.GetTasks();
    }

    if (event.target.value === "older_to_newest") {
      await this.GetTasks();
      await this.setState({ FilterTasks: event.target.value });
      let filteredArray = this.state.tasks.sort((a, b) => {
        var c = new Date(a.tk_create_date);
        var d = new Date(b.tk_create_date);
        return c - d;
      });
      await this.setState({ tasks: filteredArray });
    }

    if (event.target.value === "my_tasks") {
      const data = {
        TaskOperation: this.props.id,
        Token: window.sessionStorage.getItem("token"),
      };

      await API.post("/get_tasks_by_agent", data)
        .then((respone) => {
          const res = respone.data;
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

  convertToBase64(event) {
    //Read File
    const selectedFile = document.getElementById("inputFile").files;

    //Check File is not Empty
    if (selectedFile.length > 0) {
      // Select the very first file from list
      const fileToLoad = selectedFile[0];

      // FileReader function for read the file.
      const fileReader = new FileReader();
      var self = this;

      // Onload of file read the file content
      fileReader.onload = async function (fileLoadedEvent) {
        let base64 = fileLoadedEvent.target.result;
        let fileName = event.target.files[0].name;
        self.UpdateBase64(base64);
        self.UpdateFileName(fileName);
      };
      // // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  async GetPostsCount() {
    const data = { OperationID: this.props.id };
    await API.post("/get_operation_posts_count", data).then(async (respone) => {
      const res = respone.data;
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
      if (res.data === false || res.data.o_image === '') {
        this.setState({
          image:
            "https://img.freepik.com/free-vector/neon-cyber-security-concept-with-padlock-circuit_23-2148536303.jpg?w=900&t=st=1660930843~exp=1660931443~hmac=efcef9e6d44df72e8f8d1f679f29b28823bd0313b2a61eefecbda97b8622878d",
        });
      } else {
        this.setState({ image: res.data.o_image });
      }
    });
  }

  SettingsModal() {
    this.setState({ SettingsModal: !this.state.SettingsModal });
  }

  async UploadMemeber() {
    const data = {
      MemeberAgent: this.state.NewMember.agent,
      MemeberOperation: this.props.id,
      Token: window.sessionStorage.getItem("token"),
    };

    await API.post("/add_member", data)
      .then((respone) => {
        const res = respone.data;
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
    this.setState({
      MemberModal: !this.state.MemberModal,
    });
  }

  UpdateMemberID(event) {
    this.setState((prevState) => ({
      NewMember: {
        ...prevState.NewMember,
        agent: event.target.value,
      },
    }));
  }

  UpdateTaskState(value) {
    this.setState((prevState) => ({
      NewTask: {
        ...prevState.NewTask,
        state: value,
      },
    }));
  }

  UpdateTaskMember(value, AgentName) {
    this.setState((prevState) => ({
      NewTask: {
        ...prevState.NewTask,
        agent: value,
        AgentName: AgentName,
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

  UpdateTargetType(value) {
    this.setState((prevState) => ({
      NewTarget: {
        ...prevState.NewTarget,
        type: value,
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
    };
    await API.post("/get_posts", data)
      .then((respone) => {
        const res = respone.data;
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
        if (res.data) {
          this.setState({ targets: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetTasks() {
    console.log(
      "do not forget the tasks api and clean state after every modal close"
    );
    const data = {
      OperationID: this.props.id,
      search: this.state.SearchTasks,
    };

    await API.post("/get_tasks", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.setState({ tasks: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  PostModal() {
    this.setState({
      PostModal: !this.state.PostModal,
    });
  }

  TargetModal() {
    this.setState({
      TargetModal: !this.state.TargetModal,
    });
  }

  TaskModal() {
    this.setState({
      TaskModal: !this.state.TaskModal,
    });
  }

  SwitchSlider(slide) {
    switch (slide) {
      case "Notes":
        this.setState({
          PostsTab: true,
          TargetsTab: false,
          TasksTab: false,
        });
        break;

      case "Targets":
        this.setState({
          PostsTab: false,
          TargetsTab: true,
          TasksTab: false,
        });
        break;

      case "Tasks":
        this.setState({
          PostsTab: false,
          TargetsTab: false,
          TasksTab: true,
        });
        break;

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
        if (res.data) {
          this.GetPosts();
          this.GetPostsCount();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
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
  }

  render() {
    return (
      <div className="OperationProfile">
        <ul className="OptionsContainer">
          <li>
            <a
              onClick={() => {
                this.SettingsModal();
              }}
            >
              Settings{" "}
              <FontAwesomeIcon icon={faGear} style={{ marginLeft: "5px" }} />
            </a>{" "}
          </li>
          <li>
            <a
              onClick={() => {
                this.SwitchSlider("Targets");
              }}
            >
              Targets{" "}
              <FontAwesomeIcon
                icon={faBullseye}
                style={{ marginLeft: "5px" }}
              />
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                this.SwitchSlider("Notes");
              }}
            >
              Posts{" "}
              <FontAwesomeIcon
                icon={faAddressCard}
                style={{ marginLeft: "5px" }}
              />
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                this.SwitchSlider("Tasks");
              }}
            >
              Tasks{" "}
              <FontAwesomeIcon
                icon={faListCheck}
                style={{ marginLeft: "5px" }}
              />
            </a>
          </li>
        </ul>
        <div className="OperationProfileContent">
          <div className="OperationProfileHeader">
            <img src={this.state.image} alt="user-card" />
            <div className="OperationProfileInfo">
              <ul>
                <li style={{ fontSize: "23px" }}>{this.state.name}</li>
                <li style={{ fontSize: "15px" }}>
                  Members Count: {this.state.MembersCount}
                </li>
                <li style={{ marginTop: "10px" }}>
                  Targets Count: {this.state.TargetsCount}
                </li>
                <li>Posts Count: {this.state.PostsCount}</li>
                <li>State: {this.state.state}</li>
                <li>
                  Create Date:{" "}
                  {Moment(this.state.CreateDate).format("MMM Do YY")}
                </li>
                <li>Description: {this.state.description}</li>
              </ul>
            </div>
          </div>

          <div className="OperationProfileSlider">
            <div
              className="PostsSlide"
              style={{ display: this.state.PostsTab ? null : "none" }}
            >
              <div className="SearchContainer">
                <div>
                  <button disabled>Search</button>
                  <input
                    placeholder="Search by title or description"
                    type="text"
                    className="Search"
                    onChange={this.UpdateSearchPosts}
                  />
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <button disabled>Sort by</button>
                  <select className="Sort" onChange={this.UpdateFilterPosts}>
                    <option value="all">All</option>
                    <option value="newest_to_older">Newest to Older</option>
                    <option value="older_to_newest">Older to Newest</option>
                  </select>
                </div>
                <button className="NewObject" onClick={this.PostModal}>
                  New Post
                </button>
              </div>

              {this.state.posts.map((post, i) => {
                return (
                  <Post
                    key={i}
                    id={post.p_id}
                    title={post.p_title}
                    text={post.p_text}
                    author={post.u_name}
                    createDate={post.p_create_date}
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
              <div className="SearchContainer">
                <div>
                  <button disabled>Search</button>
                  <input
                    placeholder="Search by title or description"
                    type="text"
                    className="Search"
                    onChange={this.UpdateSearchTargets}
                  />
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <button disabled>Sort by</button>
                  <select className="Sort" onChange={this.UpdateFilterTargets}>
                    <option value="all">All</option>
                    <option value="name">Name</option>
                    <option value="date">Date</option>
                  </select>
                </div>
                <button className="NewObject" onClick={this.TargetModal}>
                  New Target
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {this.state.targets.map((target, i) => {
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
            </div>

            <div
              className="TasksSlide"
              style={{ display: this.state.TasksTab ? null : "none" }}
            >
              <div className="SearchContainer">
                <div>
                  <button disabled>Search</button>
                  <input
                    placeholder="Search by title or description"
                    type="text"
                    className="Search"
                    onChange={this.UpdatesearchTask}
                  />
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <button disabled>Sort by</button>
                  <select className="Sort" onChange={this.UpdateFilterTasks}>
                    <option value="all">All</option>
                    <option value="older_to_newest">Older to Newest</option>
                    <option value="my_tasks">My Tasks</option>
                  </select>
                </div>
                <button className="NewObject" onClick={this.TaskModal}>
                  New Task
                </button>
              </div>
              {this.state.tasks.map((task, i) => {
                return (
                  <TaskCard
                    key={i}
                    id={task.tk_id}
                    title={task.tk_title}
                    text={task.tk_content}
                    agent={task.u_name}
                    refresh={this.GetTasks}
                    CreateDate={task.tk_create_date}
                    UpdateDate={task.tk_update_date}
                  />
                );
              })}
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
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={this.UpdatePostText}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.PostModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  this.UploadPost();
                  this.PostModal();
                }}
              >
                Save Post
              </Button>
            </Modal.Footer>
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
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Target Image</Form.Label>
                  <Form.Control
                    type="file"
                    autoFocus
                    onChange={this.convertToBase64}
                    id="inputFile"
                    name="inputFile"
                    accept="application/pdf, application/vnd.ms-excel, image/*"
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
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      {this.state.NewTarget.type}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => this.UpdateTargetType("server")}
                      >
                        Server
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => this.UpdateTargetType("individual")}
                      >
                        Individual
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => this.UpdateTargetType("organization")}
                      >
                        Organization
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => this.UpdateTargetType("service")}
                      >
                        Service
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => this.UpdateTargetType("website")}
                      >
                        Website
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => this.UpdateTargetType("other")}
                      >
                        Other
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.TargetModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  this.UploadTarget();
                  this.TargetModal();
                }}
              >
                Save Target
              </Button>
            </Modal.Footer>
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
                  className="mb-3 dropdownTask"
                  controlId="exampleForm.ControlInput1"
                >
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      {this.state.NewTask.AgentName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {this.state.members.map((member, i) => {
                        return (
                          <Dropdown.Item
                            key={i}
                            onClick={() =>
                              this.UpdateTaskMember(member.u_id, member.u_name)
                            }
                          >
                            {member.u_name}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      {this.state.NewTask.state}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          this.UpdateTaskState("to do");
                        }}
                      >
                        To Do
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          this.UpdateTaskState("in progress");
                        }}
                      >
                        In Progress
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          this.UpdateTaskState("done");
                        }}
                      >
                        Done
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.TaskModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  this.UploadTask();
                  this.TaskModal();
                }}
              >
                Save Task
              </Button>
            </Modal.Footer>
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
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.MemberModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  this.UploadMemeber();
                  this.MemberModal();
                }}
              >
                Add Member
              </Button>
            </Modal.Footer>
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
                  controlId="exampleForm.ControlInput1"
                >
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      {this.state.NewTask.AgentName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {this.state.members.map((member, i) => {
                        return (
                          <Dropdown.Item
                            key={i}
                            onClick={() =>
                              this.UpdateTaskMember(member.u_id, member.u_name)
                            }
                          >
                            {member.u_name}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      {this.state.NewTask.state}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          this.UpdateTaskState("to do");
                        }}
                      >
                        To Do
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          this.UpdateTaskState("in progress");
                        }}
                      >
                        In Progress
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          this.UpdateTaskState("done");
                        }}
                      >
                        Done
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.TaskModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  this.UploadTask();
                  this.TaskModal();
                }}
              >
                Save Task
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={this.state.SettingsModal}
            size="lg"
            onHide={this.SettingsModal}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Large Modal
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="SettingsModal-Container">
                <div>
                  <h4>Add member</h4>
                  <p>
                    You can add a member to this target by clicking Add next to
                    this text
                  </p>
                </div>
                <button
                  className="NewObject btn btn-outline-secondary"
                  onClick={this.MemberModal}
                >
                  New Members
                </button>
              </div>
              <div className="SettingsModal-Container">
                <div>
                  <h4>Switch state</h4>
                  <p>
                    You can switch the activity of this target by clicking
                    Switch state next to this text
                  </p>
                </div>
                <button
                  className="NewObject btn btn-outline-secondary"
                  onClick={this.StateModal}
                >
                  Switch State
                </button>
              </div>
              <div className="SettingsModal-Container">
                <div>
                  <h4>Update</h4>
                  <p>
                    You can update this target by clicking Update next to this
                    text
                  </p>
                </div>
                <button
                  className="NewObject btn btn-primary"
                  onClick={this.InfoModal}
                >
                  Update information
                </button>
              </div>
              <div className="SettingsModal-Container">
                <div>
                  <h4>Delete</h4>
                  <p>
                    You can delete this target by clicking Delete next to this
                    text
                  </p>
                </div>
                <button
                  className="NewObject btn btn-danger"
                  onClick={this.DeleteModal}
                >
                  Delete Operation
                </button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.SettingsModal}>
                Close
              </Button>
              <Button variant="primary" onClick={this.SettingsModal}>
                Ok
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.DeleteModal} onHide={this.DeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Operation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <p>Are you sure you want to delete this Comment</p>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.DeleteModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  this.DeleteOperation();
                  this.DeleteModal();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
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
              <Modal.Title>New Info</Modal.Title>
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
                    type="text"
                    autoFocus
                    onChange={this.UpdateNewInfoDescription}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.InfoModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  this.UploadNewInfo();
                  this.InfoModal();
                }}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default withParams(OperationProfile);
