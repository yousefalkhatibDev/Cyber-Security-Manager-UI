import React, { Component } from 'react'
import postsIcon from "../icons/posts.svg"
import tasksIcon from "../icons/tasks.svg"
import targetIcon from "../icons/target.svg"
import settingsIcon from "../icons/settings.svg"
import profileIcon from "../icons/profile.svg"
import relationsIcon from "../icons/relations.svg"
import relatedByIcon from "../icons/relatedBy.svg"
import notesIcon from "../icons/notes.svg"

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const renderTooltip = (text, props) => (
    <Tooltip id="button-tooltip" {...props}>
        {text}
    </Tooltip>
);

export default class ProfilesNavigationBar extends Component {
    render() {
        return (
            <div className='ProfilesNavigationBar'>

                {
                    this.props.type === "operationProfile"
                        ?
                        (
                            <div className='ProfilesNavigationBar-container ProfilesNavigationBar-containerOperation'>
                                <button className={this.props.postsActive && "active"} onClick={() => this.props.SwitchSlider("Notes")}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={(props) => renderTooltip("see posts", props)}
                                    >
                                        <img src={postsIcon} width="24" alt="" />
                                    </OverlayTrigger>
                                    Posts
                                </button>
                                <button className={this.props.targetsActive && "active"} onClick={() => this.props.SwitchSlider("Targets")}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={(props) => renderTooltip("see targets", props)}
                                    >
                                        <img src={targetIcon} width="24" alt="" />
                                    </OverlayTrigger>
                                    Targets
                                </button>
                                <button className={this.props.tasksActive && "active"} onClick={() => this.props.SwitchSlider("Tasks")}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={(props) => renderTooltip("see tasks", props)}
                                    >
                                        <img src={tasksIcon} width="24" alt="" />
                                    </OverlayTrigger>
                                    Tasks
                                </button>
                                <button className={this.props.membersActive && "active"} onClick={() => this.props.SwitchSlider("Members")}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={(props) => renderTooltip("see members", props)}
                                    >
                                        <img src={profileIcon} width="24" alt="" />
                                    </OverlayTrigger>
                                    Members
                                </button>
                                <button className={this.props.settingsActive && "active"} onClick={() => this.props.SwitchSlider("Settings")}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={(props) => renderTooltip("operation settings", props)}
                                    >
                                        <img src={settingsIcon} width="24" alt="" />
                                    </OverlayTrigger>
                                    Settings
                                </button>
                            </div>

                        )
                        :
                        (
                            <div className='ProfilesNavigationBar-container'>
                                <button className={this.props.notesActive && "active"} onClick={() => this.props.SwitchSlider("Notes")}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={(props) => renderTooltip("see notes", props)}
                                    >
                                        <img src={notesIcon} width="24" alt="" />
                                    </OverlayTrigger>
                                    Notes
                                </button>
                                <button className={this.props.relationsActive && "active"} onClick={() => this.props.SwitchSlider("Relations")}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={(props) => renderTooltip("see relations", props)}
                                    >
                                        <img src={relationsIcon} width="24" alt="" />
                                    </OverlayTrigger>
                                    Relations
                                </button>
                                <button className={this.props.relatedByActive && "active"} onClick={() => this.props.SwitchSlider("RelatedBy")}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={(props) => renderTooltip("related by", props)}
                                    >
                                        <img src={relatedByIcon} width="24" alt="" />
                                    </OverlayTrigger>
                                    Related By
                                </button>
                                <button className={this.props.settingsActive && "active"} onClick={() => this.props.SwitchSlider("Settings")}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={(props) => renderTooltip("target settings", props)}
                                    >
                                        <img src={settingsIcon} width="24" alt="" />
                                    </OverlayTrigger>
                                    Settings
                                </button>
                            </div>
                        )
                }
            </div>
        )
    }
}
