import { useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

export default function Profile() {
    const [editP, setEditP] = useState<boolean>(false);

    function handleClick() {
        setEditP(!editP); // Toggle the state of editP
    }

    return (
        <div className="profilePage">
            <h2>My Profile</h2>
            <div className="main">
                <div className="actions">
                    <div className="user">
                        <img src="/img/c1.jpeg" alt="User Profile" />
                        <section>
                            <span>Hello</span>
                            <br />
                            <h2>Name</h2>
                        </section>
                    </div>
                    <ul className="action-list">
                        <li className="heard">
                            <a href="/my-account">
                                <i className="bi bi-person"></i> <span>My Account</span>
                            </a>
                        </li>
                        <li>
                            <a href="/orders">
                                <i className="bi bi-basket"></i> <span>Orders</span>
                            </a>
                        </li>
                        <li>
                            <a href="/rating-reviews">
                                <i className="bi bi-star"></i> <span>Rating & Reviews</span>
                            </a>
                        </li>
                        <li>
                            <a href="/wishlist">
                                <i className="bi bi-heart"></i> <span>Wishlist</span>
                            </a>
                        </li>
                        <li>
                            <a href="/payment">
                                <i className="bi bi-wallet"></i> <span>Payment</span>
                            </a>
                        </li>
                        <li>
                            <a href="/change-password">
                                <i className="bi bi-key"></i> <span>Change Password</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="info">
                    <h2>Personal Information</h2>
                    <div className="pinfo">
                        <div className="pimg">
                            <img src="/img/c1.jpeg" alt="User Profile" />
                            <p onClick={handleClick}>
                                <Link to="#">Edit Personal Information</Link>
                            </p>
                        </div>
                        <form>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" placeholder="Name" />
                            </div>
                            <div>
                                <label htmlFor="Dof">Date of Birth</label>
                                <input type="date" id="Dof" />
                            </div>
                            <div className="gender">
                                <p>Gender</p>
                                <div>
                                    <div className="ingender">
                                        <span >Male</span>
                                        <input type="radio" id="male" name="gender" value="male" />
                                    </div>
                                    <div className="ingender">
                                        <span>Female</span>
                                        <input type="radio" id="female" name="gender" value="female" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phonenumber">Phone Number</label>
                                <input type="number" id="phonenumber" />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder="Email@gmail.com" id="email" />
                            </div>
                            {editP && (
                                <>
                                    <div>
                                        <label htmlFor="img">Profile Picture</label>
                                        <input type="file" id="img" />
                                    </div>
                                    <button type="submit">Update</button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}