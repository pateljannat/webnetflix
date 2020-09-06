import React from 'react';
import Modal from '@material-ui/core/Modal';


function AuthenticationModal() {
    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center>
                            <img className="app__headerImage" alt="Logo" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png">
                            </img>
                        </center>
                        <Input className="app__input" type="text" placeholder="Username" value={userName} onChange={(event) => setUsername(event.target.value)} />
                        <Input className="app__input" type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <Input className="app__input" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <Button onClick={signUp}>Sign Up</Button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AuthenticationModal
