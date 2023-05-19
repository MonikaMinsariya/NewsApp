import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, date, author, source, category } = this.props
        let badgeClass = 'badge rounded-pill ';
        let badgeColor = "";
        switch (category) {
            case 'business':
                badgeColor = 'bg-primary';
                break;
            case 'health':
                badgeColor = 'bg-success';
                break;
            case 'entertainment':
                badgeColor = 'bg-danger';
                break;
            case 'sports':
                badgeColor = 'bg-info';
                break;
            case 'science':
                badgeColor = 'bg-warning';
                break;
            case 'technology':
                badgeColor = 'bg-secondary';
                break;
            default:
                badgeColor = 'bg-dark';
        }

        badgeClass += `${badgeColor}`;
        return (
            <div className='my-3' >
                <div className="card bg-dark text-white ">
                    <span className={`position-absolute top-0  translate-middle badge ${badgeClass}`} style={{ left: '90%', zIndex: '1' }}>{source}</span>
                    <img className="card-img-top" src={!imageUrl ? 'https://images.jpost.com/image/upload/f_auto,fl_lossy/c_fill,g_faces:center,h_407,w_690/536326' : imageUrl} alt="img1" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-secondary">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()} </small></p>
                        <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-secondary">Read More</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default NewsItem
