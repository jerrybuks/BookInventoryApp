import React from 'react';
import PropTypes from 'prop-types';
import "./Modal.css"

class Modal extends React.Component {
	constructor(props) {
		super(props);
		
	}


	render() {
		return (
			<div
				className="modal-container"
				style={{
					display: this.props.isModalOpen ? 'block' : 'none'
				}}
			>
				<div className="modal-overlay" onClick={this.props.closeModal} />
				<div className="modal-body">
                    <div className="modal-close" onClick={this.props.closeModal}>
                        x
                    </div>
					{this.props.children}
				</div>
			</div>
		);
	}
}


export default Modal;

Modal.propTypes = {
	isModalOpen: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired
};
