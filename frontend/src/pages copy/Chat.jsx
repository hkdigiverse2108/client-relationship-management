import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
					<div className="my-auto mb-2">
						<h2 className="mb-1">Chat</h2>
						<nav>
							<ol className="breadcrumb mb-0">
								<li className="breadcrumb-item">
									<a href="/"><i className="ti ti-smart-home"></i></a>
								</li>
								<li className="breadcrumb-item">
									Applications
								</li>
								<li className="breadcrumb-item active" aria-current="page">Chat</li>
							</ol>
						</nav>
					</div>
					<div className="head-icons">
						<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
							data-bs-original-title="Collapse" id="collapse-header">
							<i className="ti ti-chevrons-up"></i>
						</a>
					</div>
				</div>
				<div className="chat-wrapper"> 
					{/* Chats sidebar */}
					<div className="sidebar-group">
						<div id="chats" className="sidebar-content active slimscroll">

							<div className="slimscroll">

								<div className="chat-search-header">
									<div className="header-title d-flex align-items-center justify-content-between">
										<h4 className="mb-3">Chats</h4>
									</div>

									{/* Chat Search */}
									<div className="search-wrap">
										<form onSubmit={(e) => e.preventDefault()}>
											<div className="input-group">
												<input type="text" className="form-control"
													placeholder="Search For Contacts or Messages" />
												<span className="input-group-text"><i className="ti ti-search"></i></span>
											</div>
										</form>
									</div>
									{/* /Chat Search */}
								</div>

								<div className="sidebar-body chat-body" id="chatsidebar">

									{/* Left Chat Title */}
									<div className="d-flex justify-content-between align-items-center mb-3">
										<h5 className="chat-title">All Chats</h5>
									</div>
									{/* /Left Chat Title */}

									<div className="chat-users-wrap">
										<div className="chat-list">
											<a href="#" onClick={(e) => { e.preventDefault(); setIsChatOpen(true); }} className="chat-user-list">
												<div className="avatar avatar-lg online me-2">
													<img src="/assets/img/profiles/avatar-29.jpg" className="rounded-circle"
														alt="image" />
												</div>
												<div className="chat-user-info">
													<div className="chat-user-msg">
														<h6>Anthony Lewis</h6>
														<p><span className="animate-typing">is typing
																<span className="dot"></span>
																<span className="dot"></span>
																<span className="dot"></span>
															</span>
														</p>
													</div>
													<div className="chat-user-time">
														<span className="time">02:40 PM</span>
														<div className="chat-pin">
															<i className="ti ti-pin me-2"></i>
														</div>
													</div>
												</div>
											</a>
											<div className="chat-dropdown">
												<a className="#" href="#" data-bs-toggle="dropdown">
													<i className="ti ti-dots-vertical"></i>
												</a>
												<ul className="dropdown-menu dropdown-menu-end p-3">
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-box-align-right me-2"></i>Archive Chat</a>
													</li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-heart me-2"></i>Mark as Favourite</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-check me-2"></i>Mark as Unread</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-pinned me-2"></i>Pin Chats</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-trash me-2"></i>Delete</a></li>
												</ul>
											</div>
										</div>
										<div className="chat-list">
											<a href="#" onClick={(e) => { e.preventDefault(); setIsChatOpen(true); }} className="chat-user-list">
												<div className="avatar avatar-lg online me-2">
													<img src="/assets/img/profiles/avatar-01.jpg" className="rounded-circle"
														alt="image" />
												</div>
												<div className="chat-user-info">
													<div className="chat-user-msg">
														<h6>Elliot Murray</h6>
														<p><i className="ti ti-file me-1"></i>Document</p>
													</div>
													<div className="chat-user-time">
														<span className="time">06:12 AM</span>
														<div className="chat-pin">
															<i className="ti ti-checks text-success"></i>
														</div>
													</div>
												</div>
											</a>
											<div className="chat-dropdown">
												<a className="#" href="#" data-bs-toggle="dropdown">
													<i className="ti ti-dots-vertical"></i>
												</a>
												<ul className="dropdown-menu dropdown-menu-end p-3">
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-box-align-right me-2"></i>Archive Chat</a>
													</li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-heart me-2"></i>Mark as Favourite</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-check me-2"></i>Mark as Unread</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-pinned me-2"></i>Pin Chats</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-trash me-2"></i>Delete</a></li>
												</ul>
											</div>
										</div>
										<div className="chat-list">
											<a href="#" onClick={(e) => { e.preventDefault(); setIsChatOpen(true); }} className="chat-user-list">
												<div className="avatar avatar-lg online me-2">
													<img src="/assets/img/profiles/avatar-02.jpg" className="rounded-circle"
														alt="image" />
												</div>
												<div className="chat-user-info">
													<div className="chat-user-msg">
														<h6>Stephan Peralt</h6>
														<p className="text-danger"><i
																className="ti ti-video-off me-2"></i>Missed Video Call</p>
													</div>
													<div className="chat-user-time">
														<span className="time">03:15 AM</span>
														<div className="chat-pin">
															<i className="ti ti-pin"></i>
														</div>
													</div>
												</div>
											</a>
											<div className="chat-dropdown">
												<a className="#" href="#" data-bs-toggle="dropdown">
													<i className="ti ti-dots-vertical"></i>
												</a>
												<ul className="dropdown-menu dropdown-menu-end p-3">
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-box-align-right me-2"></i>Archive Chat</a>
													</li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-heart me-2"></i>Mark as Favourite</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-check me-2"></i>Mark as Unread</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-pinned me-2"></i>Pin Chats</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-trash me-2"></i>Delete</a></li>
												</ul>
											</div>
										</div>
										<div className="chat-list">
											<a href="#" onClick={(e) => { e.preventDefault(); setIsChatOpen(true); }} className="chat-user-list">
												<div className="avatar avatar-lg online me-2">
													<img src="/assets/img/profiles/avatar-18.jpg" className="rounded-circle"
														alt="image" />
												</div>
												<div className="chat-user-info">
													<div className="chat-user-msg">
														<h6>Rebecca Smtih</h6>
														<p>Hi How are you 🔥</p>
													</div>
													<div className="chat-user-time">
														<span className="time">Sunday</span>
														<div className="chat-pin">
															<span className="count-message fs-12 fw-semibold">25</span>
														</div>
													</div>
												</div>
											</a>
											<div className="chat-dropdown">
												<a className="#" href="#" data-bs-toggle="dropdown">
													<i className="ti ti-dots-vertical"></i>
												</a>
												<ul className="dropdown-menu dropdown-menu-end p-3">
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-box-align-right me-2"></i>Archive Chat</a>
													</li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-heart me-2"></i>Mark as Favourite</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-check me-2"></i>Mark as Unread</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-pinned me-2"></i>Pin Chats</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-trash me-2"></i>Delete</a></li>
												</ul>
											</div>
										</div>
										<div className="chat-list">
											<a href="#" onClick={(e) => { e.preventDefault(); setIsChatOpen(true); }} className="chat-user-list">
												<div className="avatar avatar-lg online me-2">
													<img src="/assets/img/profiles/avatar-14.jpg" className="rounded-circle"
														alt="image" />
												</div>
												<div className="chat-user-info">
													<div className="chat-user-msg">
														<h6>Harvey Smith</h6>
														<p>Haha oh man 🔥</p>
													</div>
													<div className="chat-user-time">
														<span className="time">03:15 AM</span>
														<div className="chat-pin">
															<i className="ti ti-pin me-2"></i>
															<span className="count-message fs-12 fw-semibold">12</span>
														</div>
													</div>
												</div>
											</a>
											<div className="chat-dropdown">
												<a className="#" href="#" data-bs-toggle="dropdown">
													<i className="ti ti-dots-vertical"></i>
												</a>
												<ul className="dropdown-menu dropdown-menu-end p-3">
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-box-align-right me-2"></i>Archive Chat</a>
													</li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-heart me-2"></i>Mark as Favourite</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-check me-2"></i>Mark as Unread</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-pinned me-2"></i>Pin Chats</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-trash me-2"></i>Delete</a></li>
												</ul>
											</div>
										</div>
										<div className="chat-list">
											<a href="#" onClick={(e) => { e.preventDefault(); setIsChatOpen(true); }} className="chat-user-list">
												<div className="avatar avatar-lg online me-2">
													<img src="/assets/img/profiles/avatar-03.jpg" className="rounded-circle"
														alt="image" />
												</div>
												<div className="chat-user-info">
													<div className="chat-user-msg">
														<h6>Lori Broaddus</h6>
														<p>Do you know which...</p>
													</div>
													<div className="chat-user-time">
														<span className="time">02:40 PM</span>
														<div className="chat-pin">
															<i className="ti ti-heart-filled text-warning"></i>
														</div>
													</div>
												</div>
											</a>
											<div className="chat-dropdown">
												<a className="#" href="#" data-bs-toggle="dropdown">
													<i className="ti ti-dots-vertical"></i>
												</a>
												<ul className="dropdown-menu dropdown-menu-end p-3">
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-box-align-right me-2"></i>Archive Chat</a>
													</li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-heart me-2"></i>Mark as Favourite</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-check me-2"></i>Mark as Unread</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-pinned me-2"></i>Pin Chats</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-trash me-2"></i>Delete</a></li>
												</ul>
											</div>
										</div>
										<div className="chat-list">
											<a href="#" onClick={(e) => { e.preventDefault(); setIsChatOpen(true); }} className="chat-user-list">
												<div className="avatar avatar-lg online me-2">
													<img src="/assets/img/profiles/avatar-15.jpg" className="rounded-circle"
														alt="image" />
												</div>
												<div className="chat-user-info">
													<div className="chat-user-msg">
														<h6>Brian Villalobos</h6>
														<p>Do you know which...</p>
													</div>
													<div className="chat-user-time">
														<span className="time">06:12 AM</span>
														<div className="chat-pin">
															<i className="ti ti-pin me-2"></i>
															<i className="ti ti-checks text-success"></i>
														</div>
													</div>
												</div>
											</a>
											<div className="chat-dropdown">
												<a className="#" href="#" data-bs-toggle="dropdown">
													<i className="ti ti-dots-vertical"></i>
												</a>
												<ul className="dropdown-menu dropdown-menu-end p-3">
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-box-align-right me-2"></i>Archive Chat</a>
													</li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-heart me-2"></i>Mark as Favourite</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-check me-2"></i>Mark as Unread</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-pinned me-2"></i>Pin Chats</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-trash me-2"></i>Delete</a></li>
												</ul>
											</div>
										</div>
										<div className="chat-list">
											<a href="#" onClick={(e) => { e.preventDefault(); setIsChatOpen(true); }} className="chat-user-list">
												<div className="avatar avatar-lg online me-2">
													<img src="/assets/img/profiles/avatar-08.jpg" className="rounded-circle"
														alt="image" />
												</div>
												<div className="chat-user-info">
													<div className="chat-user-msg">
														<h6>Linda Ray</h6>
														<p><i className="ti ti-photo me-2"></i>Photo</p>
													</div>
													<div className="chat-user-time">
														<span className="time">Wednesday</span>
														<div className="chat-pin">
															<span className="count-message fs-12 fw-semibold">12</span>
														</div>
													</div>
												</div>
											</a>
											<div className="chat-dropdown">
												<a className="#" href="#" data-bs-toggle="dropdown">
													<i className="ti ti-dots-vertical"></i>
												</a>
												<ul className="dropdown-menu dropdown-menu-end p-3">
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-box-align-right me-2"></i>Archive Chat</a>
													</li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-heart me-2"></i>Mark as Favourite</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-check me-2"></i>Mark as Unread</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-pinned me-2"></i>Pin Chats</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-trash me-2"></i>Delete</a></li>
												</ul>
											</div>
										</div>
										<div className="chat-list">
											<a href="#" onClick={(e) => { e.preventDefault(); setIsChatOpen(true); }} className="chat-user-list">
												<div className="avatar avatar-lg online me-2">
													<img src="/assets/img/profiles/avatar-07.jpg" className="rounded-circle"
														alt="image" />
												</div>
												<div className="chat-user-info">
													<div className="chat-user-msg">
														<h6>Doglas Martini</h6>
														<p className="text-success"><i
																className="ti ti-video-plus text-success me-2"></i>Incoming
															Video Call</p>
													</div>
													<div className="chat-user-time">
														<span className="time">02:40 PM</span>
														<div className="chat-pin">
															<i className="ti ti-heart-filled text-warning"></i>
														</div>
													</div>
												</div>
											</a>
											<div className="chat-dropdown">
												<a className="#" href="#" data-bs-toggle="dropdown">
													<i className="ti ti-dots-vertical"></i>
												</a>
												<ul className="dropdown-menu dropdown-menu-end p-3">
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-box-align-right me-2"></i>Archive Chat</a>
													</li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-heart me-2"></i>Mark as Favourite</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-check me-2"></i>Mark as Unread</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-pinned me-2"></i>Pin Chats</a></li>
													<li><a className="dropdown-item" href="#"><i
																className="ti ti-trash me-2"></i>Delete</a></li>
												</ul>
											</div>
										</div>
									</div>
								</div>

							</div>

						</div>

					</div>
					{/* / Chats sidebar */}

					{/* Chat */}
					<div className={`chat chat-messages ${isChatOpen ? "show" : ""}`} id="middle">
						<div>
							<div className="chat-header">
								<div className="user-details">
									<div className="d-xl-none">
										<a href="#" className="text-muted chat-close me-2" onClick={(e) => { e.preventDefault(); setIsChatOpen(false); }}>
											<i className="fas fa-arrow-left"></i>
										</a>
									</div>
									<div className="avatar avatar-lg online flex-shrink-0">
										<img src="/assets/img/profiles/avatar-29.jpg" className="rounded-circle" alt="image" />
									</div>
									<div className="ms-2 overflow-hidden">
										<h6>Anthony Lewis</h6>
										<span className="last-seen">Online</span>
									</div>
								</div>
								<div className="chat-options">
									<ul>
										<li>
											<a href="javascript:void(0)" className="btn chat-search-btn"
												data-bs-toggle="tooltip" data-bs-placement="bottom" title="Search">
												<i className="ti ti-search"></i>
											</a>
										</li>
										<li>
											<a className="btn no-bg" href="#" data-bs-toggle="dropdown">
												<i className="ti ti-dots-vertical"></i>
											</a>
											<ul className="dropdown-menu dropdown-menu-end p-3">
												<li><a href="#" className="dropdown-item"><i
															className="ti ti-volume-off me-2"></i>Mute Notification</a></li>
												<li><a href="#" className="dropdown-item"><i
															className="ti ti-clock-hour-4 me-2"></i>Disappearing Message</a>
												</li>
												<li><a href="#" className="dropdown-item"><i
															className="ti ti-clear-all me-2"></i>Clear Message</a></li>
												<li><a href="#" className="dropdown-item"><i
															className="ti ti-trash me-2"></i>Delete Chat</a></li>
												<li><a href="#" className="dropdown-item"><i
															className="ti ti-ban me-2"></i>Block</a></li>
											</ul>
										</li>
									</ul>
								</div>
								{/* Chat Search */}
								<div className="chat-search search-wrap contact-search">
									<form onSubmit={(e) => e.preventDefault()}>
										<div className="input-group">
											<input type="text" className="form-control" placeholder="Search Contacts" />
											<span className="input-group-text"><i className="ti ti-search"></i></span>
										</div>
									</form>
								</div>
								{/* /Chat Search */}
							</div>
							<div className="chat-body chat-page-group slimscroll">
								<div className="messages">
									<div className="chats">
										<div className="chat-avatar">
											<img src="/assets/img/profiles/avatar-29.jpg" className="rounded-circle"
												alt="image" />
										</div>
										<div className="chat-content">
											<div className="chat-info">
												<div className="message-content">
													Hi John, I wanted to update you on a new company policy regarding
													remote work.
													<div className="emoj-group">
														<ul>
															<li className="emoj-action"><a href="#" onClick={(e) => e.preventDefault()}><i
																		className="ti ti-mood-smile"></i></a>
																<div className="emoj-group-list">
																	<ul>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-02.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-05.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-06.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-07.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-08.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-03.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-10.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-09.svg"
																					alt="Icon" /></a></li>
																		<li className="add-emoj"><a
																				href="#" onClick={(e) => e.preventDefault()}><i
																					className="ti ti-plus"></i></a></li>
																	</ul>
																</div>
															</li>
															<li><a href="#"><i className="ti ti-arrow-forward-up"></i></a>
															</li>
														</ul>
													</div>
												</div>
												<div className="chat-actions">
													<a className="#" href="#" data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Reply</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Forward</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-file-export me-2"></i>Copy</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Mark as Favourite</a>
														</li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-trash me-2"></i>Delete</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-check me-2"></i>Mark as Unread</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-box-align-right me-2"></i>Archeive
																Chat</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Pin Chat</a></li>
													</ul>
												</div>
											</div>
											<div className="chat-profile-name">
												<h6>Anthony Lewis<i className="ti ti-circle-filled fs-7 mx-2"></i><span
														className="chat-time">08:00 AM</span></h6>
											</div>
											<div className="chat-info">
												<div className="message-content">
													Do you have a moment?
													<div className="emoj-group">
														<ul>
															<li className="emoj-action"><a href="#" onClick={(e) => e.preventDefault()}><i
																		className="ti ti-mood-smile"></i></a>
																<div className="emoj-group-list">
																	<ul>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-02.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-05.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-06.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-07.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-08.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-03.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-10.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-09.svg"
																					alt="Icon" /></a></li>
																		<li className="add-emoj"><a
																				href="#" onClick={(e) => e.preventDefault()}><i
																					className="ti ti-plus"></i></a></li>
																	</ul>
																</div>
															</li>
															<li><a href="#"><i className="ti ti-arrow-forward-up"></i></a>
															</li>
														</ul>
													</div>
												</div>
												<div className="chat-actions">
													<a className="#" href="#" data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Reply</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Forward</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-file-export me-2"></i>Copy</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Mark as Favourite</a>
														</li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-trash me-2"></i>Delete</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-check me-2"></i>Mark as Unread</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-box-align-right me-2"></i>Archeive
																Chat</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Pin Chat</a></li>
													</ul>
												</div>
											</div>
											<div className="chat-profile-name">
												<h6>Anthony Lewis<i className="ti ti-circle-filled fs-7 mx-2"></i><span
														className="chat-time">08:00 AM</span></h6>
											</div>
										</div>
									</div>
									<div className="chats chats-right">
										<div className="chat-content">
											<div className="chat-info">
												<div className="chat-actions">
													<a className="#" href="#" data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Reply</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Forward</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-file-export me-2"></i>Copy</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Mark as Favourite</a>
														</li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-trash me-2"></i>Delete</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-check me-2"></i>Mark as Unread</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-box-align-right me-2"></i>Archeive
																Chat</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Pin Chat</a></li>
													</ul>
												</div>
												<div className="message-content">
													Sure, Sarah. What’s the new policy?
													<div className="emoj-group">
														<ul>
															<li className="emoj-action"><a href="#" onClick={(e) => e.preventDefault()}><i
																		className="ti ti-mood-smile"></i></a>
																<div className="emoj-group-list">
																	<ul>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-02.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-05.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-06.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-07.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-08.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-03.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-10.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-09.svg"
																					alt="Icon" /></a></li>
																		<li className="add-emoj"><a
																				href="#" onClick={(e) => e.preventDefault()}><i
																					className="ti ti-plus"></i></a></li>
																	</ul>
																</div>
															</li>
															<li><a href="#"><i className="ti ti-arrow-forward-up"></i></a>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div className="chat-profile-name text-end">
												<h6>You<i className="ti ti-circle-filled fs-7 mx-2"></i><span
														className="chat-time">08:00 AM</span><span
														className="msg-read success"><i className="ti ti-checks"></i></span>
												</h6>
											</div>
										</div>
										<div className="chat-avatar">
											<img src="/assets/img/profiles/avatar-14.jpg"
												className="rounded-circle dreams_chat" alt="image" />
										</div>
									</div>
									<div className="chats">
										<div className="chat-avatar">
											<img src="/assets/img/profiles/avatar-29.jpg" className="rounded-circle"
												alt="image" />
										</div>
										<div className="chat-content">
											<div className="chat-info">
												<div className="message-content">
													Starting next month, we’ll be implementing a hybrid work model.
													Employees can work from home up to three days a week.
													<div className="emoj-group">
														<ul>
															<li className="emoj-action"><a href="#" onClick={(e) => e.preventDefault()}><i
																		className="ti ti-mood-smile"></i></a>
																<div className="emoj-group-list">
																	<ul>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-02.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-05.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-06.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-07.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-08.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-03.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-10.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-09.svg"
																					alt="Icon" /></a></li>
																		<li className="add-emoj"><a
																				href="#" onClick={(e) => e.preventDefault()}><i
																					className="ti ti-plus"></i></a></li>
																	</ul>
																</div>
															</li>
															<li><a href="#"><i className="ti ti-arrow-forward-up"></i></a>
															</li>
														</ul>
													</div>
												</div>
												<div className="chat-actions">
													<a className="#" href="#" data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Reply</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Forward</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-file-export me-2"></i>Copy</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Mark as Favourite</a>
														</li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-trash me-2"></i>Delete</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-check me-2"></i>Mark as Unread</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-box-align-right me-2"></i>Archeive
																Chat</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Pin Chat</a></li>
													</ul>
												</div>
											</div>
											<div className="chat-profile-name">
												<h6>Anthony Lewis<i className="ti ti-circle-filled fs-7 mx-2"></i><span
														className="chat-time">08:00 AM</span></h6>
											</div>
										</div>
									</div>
									<div className="chats chats-right">
										<div className="chat-content">
											<div className="chat-info">
												<div className="chat-actions">
													<a className="#" href="#" data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Reply</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Forward</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-file-export me-2"></i>Copy</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Mark as Favourite</a>
														</li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-trash me-2"></i>Delete</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-check me-2"></i>Mark as Unread</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-box-align-right me-2"></i>Archeive
																Chat</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Pin Chat</a></li>
													</ul>
												</div>
												<div className="message-content">
													That sounds great! Are there any specific requirements for tracking
													our hours when working remotely?
													<div className="emoj-group">
														<ul>
															<li className="emoj-action"><a href="#" onClick={(e) => e.preventDefault()}><i
																		className="ti ti-mood-smile"></i></a>
																<div className="emoj-group-list">
																	<ul>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-02.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-05.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-06.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-07.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-08.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-03.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-10.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-09.svg"
																					alt="Icon" /></a></li>
																		<li className="add-emoj"><a
																				href="#" onClick={(e) => e.preventDefault()}><i
																					className="ti ti-plus"></i></a></li>
																	</ul>
																</div>
															</li>
															<li><a href="#"><i className="ti ti-arrow-forward-up"></i></a>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div className="chat-profile-name text-end">
												<h6>You<i className="ti ti-circle-filled fs-7 mx-2"></i><span
														className="chat-time">08:00 AM</span><span
														className="msg-read success"><i className="ti ti-checks"></i></span>
												</h6>
											</div>
										</div>
										<div className="chat-avatar">
											<img src="/assets/img/profiles/avatar-14.jpg"
												className="rounded-circle dreams_chat" alt="image" />
										</div>
									</div>
									<div className="chat-line">
										<span className="chat-date">Today, July 24</span>
									</div>
									<div className="chats">
										<div className="chat-avatar">
											<img src="/assets/img/profiles/avatar-29.jpg" className="rounded-circle"
												alt="image" />
										</div>
										<div className="chat-content">
											<div className="chat-info">
												<div className="message-content">
													Yes, we’ll be using a time-tracking tool to log hours. You’ll need
													to ensure you’re available during your usual working hours and keep
													your manager updated if anything changes.
													<div className="emoj-group">
														<ul>
															<li className="emoj-action"><a href="#" onClick={(e) => e.preventDefault()}><i
																		className="ti ti-mood-smile"></i></a>
																<div className="emoj-group-list">
																	<ul>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-02.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-05.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-06.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-07.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-08.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-03.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-10.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-09.svg"
																					alt="Icon" /></a></li>
																		<li className="add-emoj"><a
																				href="#" onClick={(e) => e.preventDefault()}><i
																					className="ti ti-plus"></i></a></li>
																	</ul>
																</div>
															</li>
															<li><a href="#"><i className="ti ti-arrow-forward-up"></i></a>
															</li>
														</ul>
													</div>
												</div>
												<div className="chat-actions">
													<a className="#" href="#" data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Reply</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Forward</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-file-export me-2"></i>Copy</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Mark as Favourite</a>
														</li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-trash me-2"></i>Delete</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-check me-2"></i>Mark as Unread</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-box-align-right me-2"></i>Archeive
																Chat</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Pin Chat</a></li>
													</ul>
												</div>
											</div>
											<div className="chat-profile-name">
												<h6>Anthony Lewis<i className="ti ti-circle-filled fs-7 mx-2"></i><span
														className="chat-time">08:00 AM</span></h6>
											</div>
										</div>
									</div>
									<div className="chats chats-right">
										<div className="chat-content">
											<div className="chat-info">
												<div className="chat-actions">
													<a className="#" href="#" data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Reply</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Forward</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-file-export me-2"></i>Copy</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-heart me-2"></i>Mark as Favourite</a>
														</li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-trash me-2"></i>Delete</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-check me-2"></i>Mark as Unread</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-box-align-right me-2"></i>Archeive
																Chat</a></li>
														<li><a className="dropdown-item" href="#"><i
																	className="ti ti-pinned me-2"></i>Pin Chat</a></li>
													</ul>
												</div>
												<div className="message-content">
													Got it. Do we need to fill out any forms to start working remotely?
													<div className="emoj-group">
														<ul>
															<li className="emoj-action"><a href="#" onClick={(e) => e.preventDefault()}><i
																		className="ti ti-mood-smile"></i></a>
																<div className="emoj-group-list">
																	<ul>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-02.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-05.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-06.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-07.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-08.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-03.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-10.svg"
																					alt="Icon" /></a></li>
																		<li><a href="#" onClick={(e) => e.preventDefault()}><img
																					src="/assets/img/icons/emonji-09.svg"
																					alt="Icon" /></a></li>
																		<li className="add-emoj"><a
																				href="#" onClick={(e) => e.preventDefault()}><i
																					className="ti ti-plus"></i></a></li>
																	</ul>
																</div>
															</li>
															<li><a href="#"><i className="ti ti-arrow-forward-up"></i></a>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div className="chat-profile-name text-end">
												<h6>You<i className="ti ti-circle-filled fs-7 mx-2"></i><span
														className="chat-time">08:00 AM</span><span
														className="msg-read success"><i className="ti ti-checks"></i></span>
												</h6>
											</div>
										</div>
										<div className="chat-avatar">
											<img src="/assets/img/profiles/avatar-14.jpg"
												className="rounded-circle dreams_chat" alt="image" />
										</div>
									</div>
									<div className="chats">
										<div className="chat-avatar">
											<img src="/assets/img/profiles/avatar-29.jpg" className="rounded-circle"
												alt="image" />
										</div>
										<div className="chat-content">
											<div className="chat-profile-name">
												<h6>Edward Lietz<i className="ti ti-circle-filled fs-7 mx-2"></i><span
														className="chat-time">02:39 PM</span><span
														className="msg-read success"><i className="ti ti-checks"></i></span>
												</h6>
											</div>
											<div className="message-content">
												<span className="animate-typing">is typing
													<span className="dot"></span>
													<span className="dot"></span>
													<span className="dot"></span>
												</span>
												<div className="emoj-group">
													<ul>
														<li className="emoj-action"><a href="#" onClick={(e) => e.preventDefault()}><i
																	className="ti ti-mood-smile"></i></a>
															<div className="emoj-group-list">
																<ul>
																	<li><a href="#" onClick={(e) => e.preventDefault()}><img
																				src="/assets/img/icons/emonji-02.svg"
																				alt="Icon" /></a></li>
																	<li><a href="#" onClick={(e) => e.preventDefault()}><img
																				src="/assets/img/icons/emonji-05.svg"
																				alt="Icon" /></a></li>
																	<li><a href="#" onClick={(e) => e.preventDefault()}><img
																				src="/assets/img/icons/emonji-06.svg"
																				alt="Icon" /></a></li>
																	<li><a href="#" onClick={(e) => e.preventDefault()}><img
																				src="/assets/img/icons/emonji-07.svg"
																				alt="Icon" /></a></li>
																	<li><a href="#" onClick={(e) => e.preventDefault()}><img
																				src="/assets/img/icons/emonji-08.svg"
																				alt="Icon" /></a></li>
																	<li className="add-emoj"><a
																			href="#" onClick={(e) => e.preventDefault()}><i
																				className="ti ti-plus"></i></a></li>
																</ul>
															</div>
														</li>
														<li><a href="#"><i className="ti ti-arrow-forward-up"></i></a></li>
													</ul>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>
						<div className="chat-footer">
							<form onSubmit={(e) => e.preventDefault()} className="footer-form">
								<div className="chat-footer-wrap">
									<div className="form-item">
										<a href="#" className="action-circle"><i className="ti ti-microphone"></i></a>
									</div>
									<div className="form-wrap">
										<input type="text" className="form-control" placeholder="Type Your Message" />
									</div>
									<div className="form-item emoj-action-foot">
										<a href="#" className="action-circle"><i className="ti ti-mood-smile"></i></a>
										<div className="emoj-group-list-foot down-emoji-circle">
											<ul>
												<li><a href="#" onClick={(e) => e.preventDefault()}><img
															src="/assets/img/icons/emonji-02.svg" alt="Icon" /></a></li>
												<li><a href="#" onClick={(e) => e.preventDefault()}><img
															src="/assets/img/icons/emonji-05.svg" alt="Icon" /></a></li>
												<li><a href="#" onClick={(e) => e.preventDefault()}><img
															src="/assets/img/icons/emonji-06.svg" alt="Icon" /></a></li>
												<li><a href="#" onClick={(e) => e.preventDefault()}><img
															src="/assets/img/icons/emonji-07.svg" alt="Icon" /></a></li>
												<li><a href="#" onClick={(e) => e.preventDefault()}><img
															src="/assets/img/icons/emonji-08.svg" alt="Icon" /></a></li>
												<li className="add-emoj"><a href="#" onClick={(e) => e.preventDefault()}><i
															className="ti ti-plus"></i></a></li>
											</ul>
										</div>
									</div>
									<div
										className="form-item position-relative d-flex align-items-center justify-content-center ">
										<a href="#" className="action-circle file-action position-absolute">
											<i className="ti ti-folder"></i>
										</a>
										<input type="file" className="open-file position-relative" name="files" id="files" />
									</div>
									<div className="form-item">
										<a href="#" data-bs-toggle="dropdown">
											<i className="ti ti-dots-vertical"></i>
										</a>
										<div className="dropdown-menu dropdown-menu-end p-3">
											<a href="#" className="dropdown-item"><i
													className="ti ti-camera-selfie me-2"></i>Camera</a>
											<a href="#" className="dropdown-item"><i
													className="ti ti-photo-up me-2"></i>Gallery</a>
											<a href="#" className="dropdown-item"><i className="ti ti-music me-2"></i>Audio</a>
											<a href="#" className="dropdown-item"><i
													className="ti ti-map-pin-share me-2"></i>Location</a>
											<a href="#" className="dropdown-item"><i
													className="ti ti-user-check me-2"></i>Contact</a>
										</div>
									</div>
									<div className="form-btn">
										<button className="btn btn-primary" type="submit">
											<i className="ti ti-send"></i>
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
					{/* /Chat */}
				</div>
			</div>
		</div>
		
    </>
  );
};

export default Chat;
