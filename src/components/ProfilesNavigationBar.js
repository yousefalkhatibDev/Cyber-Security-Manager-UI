import React, { Component } from 'react'
import postsIcon from "../icons/posts.svg"
import tasksIcon from "../icons/tasks.svg"
import targetIcon from "../icons/target.svg"
import settingsIcon from "../icons/settings.svg"
import profileIcon from "../icons/profile.svg"

export default class ProfilesNavigationBar extends Component {
    render() {
        return (
            <div className='ProfilesNavigationBar'>

                {
                    this.props.type === "operationProfile"
                        ?
                        (
                            <div className='ProfilesNavigationBar-container'>
                                <button className={this.props.postsActive && "active"} onClick={() => this.props.SwitchSlider("Notes")}><img src={postsIcon} width="24" />Posts</button>
                                <button className={this.props.targetsActive && "active"} onClick={() => this.props.SwitchSlider("Targets")}><img src={targetIcon} width="24" />Targets</button>
                                <button className={this.props.tasksActive && "active"} onClick={() => this.props.SwitchSlider("Tasks")}><img src={tasksIcon} width="24" />Tasks</button>
                                <button className={this.props.membersActive && "active"} onClick={() => this.props.SwitchSlider("Members")}><img src={profileIcon} width="24" />Members</button>
                                <button className={this.props.settingsActive && "active"} onClick={() => this.props.SwitchSlider("Settings")}><img src={settingsIcon} width="24" />Settings</button>
                            </div>

                        )
                        :
                        (
                            <div className='ProfilesNavigationBar-container'>
                                <button className={this.props.notesActive && "active"} onClick={() => this.props.SwitchSlider("Notes")}><img src={postsIcon} width="24" />Notes</button>
                                <button className={this.props.relationsActive && "active"} onClick={() => this.props.SwitchSlider("Relations")}><img src={targetIcon} width="24" />Relations</button>
                                <button className={this.props.relatedByActive && "active"} onClick={() => this.props.SwitchSlider("RelatedBy")}><img src={tasksIcon} width="24" />Related By</button>
                                <button className={this.props.settingsActive && "active"} onClick={() => this.props.SwitchSlider("Settings")}><img src={settingsIcon} width="24" />Settings</button>
                            </div>
                        )
                }
            </div>
        )
    }
}
