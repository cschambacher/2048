import React from 'react';

class Tile extends React.Component {
    constructor(props) {
        super(props);
        
    }


    render() {
        const tile = this.props.tile;
        // console.log("tile jsx",tile)
        let klass, text;
        
        klass = `tile ${tile.value}`;
        text = (tile.value > 0 ? `${tile.value} ` : "");
        return (
            <div className={klass} >{text}</div>
        );
    }
}

export default Tile;
