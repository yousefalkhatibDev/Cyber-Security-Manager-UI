import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { useParams } from "react-router-dom";

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
      TargetsCount: 5,
      PostsCount: 5,
      MembersCount: 5,
      state: "",
      description: "",
      CreateDate: "",
      posts: [],
      targets: [],
      tasks: [],
      members: [],
      PostsTab: 1,
      TargetsTab: 0,
      TasksTab: 0,
      PostModal: false,
      TargetModal: false,
      TaskModal: false,
      MemberModal: false,
      NewTarget: {
        name: "",
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
    };

    this.SwitchSlider = this.SwitchSlider.bind(this);
    this.PostModal = this.PostModal.bind(this);
    this.TargetModal = this.TargetModal.bind(this);
    this.TaskModal = this.TaskModal.bind(this);
    this.GetOperationInfo = this.GetOperationInfo.bind(this);
    this.GetPosts = this.GetPosts.bind(this);
    this.GetTargets = this.GetTargets.bind(this);
    this.GetMembers = this.GetMembers.bind(this);
    this.GetTasks = this.GetTasks.bind(this);

    this.UploadTarget = this.UploadTarget.bind(this);
    this.UploadPost = this.UploadPost.bind(this);
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
    this.UploadTask = this.UploadTask.bind(this);
    this.UpdateMemberID = this.UpdateMemberID.bind(this);
    this.MemberModal = this.MemberModal.bind(this);
    this.UploadMemeber = this.UploadMemeber.bind(this);
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
          PostsTab: 1,
          TargetsTab: 0,
          TasksTab: 0,
        });
        break;

      case "Targets":
        this.setState({
          PostsTab: 0,
          TargetsTab: 1,
          TasksTab: 0,
        });
        break;

      case "Tasks":
        this.setState({
          PostsTab: 0,
          TargetsTab: 0,
          TasksTab: 1,
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
    };

    await API.post("/add_target", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.GetTargets();
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
  }

  render() {
    return (
      <div className="OperationProfile">
        <div className="OperationProfileHeader">
          <img
            src="https://img.freepik.com/free-vector/neon-cyber-security-concept-with-padlock-circuit_23-2148536303.jpg?w=900&t=st=1660930843~exp=1660931443~hmac=efcef9e6d44df72e8f8d1f679f29b28823bd0313b2a61eefecbda97b8622878d"
            alt="user-card"
          />
          <div className="OperationProfileInfo">
            <ul>
              <li>Name: {this.state.name}</li>
              <li>Members Count: {this.state.MembersCount}</li>
              <li>Targets Count: {this.state.TargetsCount}</li>
              <li>Posts Count: {this.state.PostsCount}</li>
              <li>State: {this.state.state}</li>
              <li>Create Date: {this.state.CreateDate}</li>
              <li>Description: {this.state.description}</li>
            </ul>
          </div>
        </div>

        <div className="OperationProfileSlider">
          <div>
            <button
              className="profile-slider-btn  btn btn-secondary"
              onClick={() => {
                this.SwitchSlider("Notes");
              }}
            >
              Posts
            </button>
            <button
              className="profile-slider-btn  btn btn-secondary"
              onClick={() => {
                this.SwitchSlider("Targets");
              }}
            >
              Targets
            </button>
            <button
              className="profile-slider-btn  btn btn-secondary"
              onClick={() => {
                this.SwitchSlider("Tasks");
              }}
            >
              Tasks
            </button>
          </div>

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
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <button disabled>Sort by</button>
                <select className="Sort">
                  <option value="Name">Title</option>
                  <option value="Date">Date</option>
                </select>
              </div>
              <button className="NewObject" onClick={this.PostModal}>
                New Post
              </button>
              <button className="NewObject" onClick={this.MemberModal}>
                New Members
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
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <button disabled>Sort by</button>
                <select className="Sort">
                  <option value="Name">Title</option>
                  <option value="Date">Date</option>
                </select>
              </div>
              <button className="NewObject" onClick={this.TargetModal}>
                New Target
              </button>
            </div>
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
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <button disabled>Sort by</button>
                <select className="Sort">
                  <option value="Name">Title</option>
                  <option value="Date">Date</option>
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
                  id={task.t_id}
                  title={task.tk_title}
                  content={task.tk_content}
                  agent={task.u_name}
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
                      href="#/action-1"
                      onClick={() => this.UpdateTargetType("server")}
                    >
                      Server
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-2"
                      onClick={() => this.UpdateTargetType("individual")}
                    >
                      Individual
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-3"
                      onClick={() => this.UpdateTargetType("organization")}
                    >
                      Organization
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-3"
                      onClick={() => this.UpdateTargetType("service")}
                    >
                      Service
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-3"
                      onClick={() => this.UpdateTargetType("website")}
                    >
                      Website
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-3"
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
                          href="#/action-1"
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
      </div>
    );
  }
}

export default withParams(OperationProfile);
