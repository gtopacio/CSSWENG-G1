import React from 'react'
import '../css/Chat.css';
import * as AiIcons from 'react-icons/ai';
import { Card, Form, FormControl, Button, Modal, InputGroup} from 'react-bootstrap';

export default function Chat() {
    return (
        
		<div className="container-fluid h-100" style={{minHeight:'90vh',zIndex:-1,position:'relative'}}>
            <div className="mb-3"></div>
			<div className="row justify-content-center h-100">
				<div className="col-md-4 col-xl-3 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
					<div className="card-header chat-bg-additional">
                        <Form.Group className="input-group" >
						
                        <Form.Control type="text" placeholder="Search" />
						
                        </Form.Group>
					</div>
					<div className="card-body contacts_body">
						<ui className="contacts">
						<li className="active">
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="https://i.imgur.com/bBIYuQx.png" className="rounded-circle user_img" alt="xd"/>
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>Thicc Amogus</span>
									<p>Kalid is online</p>
								</div>
							</div>
						</li>
						<li>
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="https://i.imgur.com/ouKrxF9.png" className="rounded-circle user_img" alt="xd"/>
									<span className="online_icon offline"></span>
								</div>
								<div className="user_info">
									<span>Taherah Big</span>
									<p>Taherah left 7 mins ago</p>
								</div>
							</div>
						</li>
						<li>
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="https://i.imgur.com/jzXYna6.png" className="rounded-circle user_img" alt="xd"/>
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>Sami Rafi</span>
									<p>Sami is online</p>
								</div>
							</div>
						</li>
						<li>
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="https://i.imgur.com/otXHmoq.png" className="rounded-circle user_img" alt="xd"/>
									<span className="online_icon offline"></span>
								</div>
								<div className="user_info">
									<span>Nargis Hawa</span>
									<p>Nargis left 30 mins ago</p>
								</div>
							</div>
						</li>
						<li>
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg" className="rounded-circle user_img" alt="xd"/>
									<span className="online_icon offline"></span>
								</div>
								<div className="user_info">
									<span>Rashid Samim</span>
									<p>Rashid left 50 mins ago</p>
								</div>
							</div>
						</li>
						</ui>
					</div>
					<div className="card-footer"></div>
				</div></div>
				<div className="col-md-8 col-xl-6 chat">
					<div className="card">
						<div className="card-header chat-bg-additional msg_head">
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="https://i.imgur.com/bBIYuQx.png" className="rounded-circle user_img" alt="xd"/>
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>Chat with Thicc Amogus</span>
									<p>1767 Messages</p>
								</div>
							</div>
						</div>
						<div className="card-body chat-bg-additional msg_card_body">
							<div className="d-flex justify-content-start mb-4">
								<div className="img_cont_msg">
									<img src="https://i.imgur.com/bBIYuQx.png" className="rounded-circle user_img_msg" alt="xd"/>
								</div>
								<div className="msg_cotainer">
									Hi, how are you samim?
									<span className="msg_time">8:40 AM, Today</span>
								</div>
							</div>
							<div className="d-flex justify-content-end mb-4">
								<div className="msg_cotainer_send">
									Hi Yellow Amogus i am good tnx how about you?
									<span className="msg_time_send">8:55 AM, Today</span>
								</div>
								<div className="img_cont_msg">
							<img src="https://i.imgur.com/HX9IOgi.png" className="rounded-circle user_img_msg" alt="xd"/>
								</div>
							</div>
							<div className="d-flex justify-content-start mb-4">
								<div className="img_cont_msg">
									<img src="https://i.imgur.com/bBIYuQx.png" className="rounded-circle user_img_msg" alt="xd"/>
								</div>
								<div className="msg_cotainer">
									I am good too, thank you for your chat template
									<span className="msg_time">9:00 AM, Today</span>
								</div>
							</div>
							<div className="d-flex justify-content-end mb-4">
								<div className="msg_cotainer_send">
									You are welcome
									<span className="msg_time_send">9:05 AM, Today</span>
								</div>
								<div className="img_cont_msg">
							<img src="https://i.imgur.com/HX9IOgi.png" className="rounded-circle user_img_msg" alt="xd"></img>
								</div>
							</div>
							<div className="d-flex justify-content-start mb-4">
								<div className="img_cont_msg">
									<img src="https://i.imgur.com/bBIYuQx.png" className="rounded-circle user_img_msg" alt="xd"/>
								</div>
								<div className="msg_cotainer">
									I am looking for your next templates
									<span className="msg_time">9:07 AM, Today</span>
								</div>
							</div>
							<div className="d-flex justify-content-end mb-4">
								<div className="msg_cotainer_send">
									Ok, thank you have a good day
									<span className="msg_time_send">9:10 AM, Today</span>
								</div>
								<div className="img_cont_msg">
						<img src="https://i.imgur.com/HX9IOgi.png" className="rounded-circle user_img_msg" alt="xd" />
								</div>
							</div>
							<div className="d-flex justify-content-start mb-4">
								<div className="img_cont_msg">
									<img src="https://i.imgur.com/bBIYuQx.png" className="rounded-circle user_img_msg" alt="xd"/>
								</div>
								<div className="msg_cotainer">
									Bye, see you
									<span className="msg_time">9:12 AM, Today</span>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<div className="input-group">
								<div className="input-group-append">
                                <Form.Group controlId="formFile">
									<span className="input-group-text attach_btn"><AiIcons.AiOutlinePaperClip /></span>
                                    </Form.Group>
								</div>
								<Form.Control as="textarea" rows={3} placeholder="Enter message"/>
                                
								<div className="input-group-append">
									<span className="input-group-text send_btn"><AiIcons.AiOutlineEnter /></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    
    )
}
