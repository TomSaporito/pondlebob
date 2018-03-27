import React from 'react';

export default class extends React.Component{
    constructor(props){
        super(props);

        this.renderHeaderClose = this.renderHeaderClose.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
    }

    renderFooter(){
        return(
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        );
    }

    renderHeaderClose(){
        return(
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        );
    }
    
    render(){
        return(
            <div id={this.props.id} className="modal fade" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{this.props.modalTitle}</h5>
                    {this.props.modalHeaderClose || this.renderHeaderClose()}
                  </div>
                  <div className="modal-body">
                    {this.props.children}
                  </div>
                  <div className="modal-footer">
                    {this.props.modalFooter || this.renderFooter()}
                  </div>
                </div>
              </div>
            </div>
        
        
        );
    }
}