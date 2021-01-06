import React from 'react'

class  MemeGenerator extends React.Component{
  constructor(){
    super();
    this.state={
      topText : "",
      bottomText : "",
      randomImg : "http://i.imgflip.com/ibij.png",
      allMemeImages : []
    }
  }

  componentDidMount(){
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const {memes} = response.data
        this.setState({allMemeImages :  memes})
      })
  }

  handleChange = (event) => {
    const {name,value} = event.target;
    this.setState({[name]:value}) 
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const randomNum = Math.floor(Math.random() * this.state.allMemeImages.length)
    const randomMemeImg = this.state.allMemeImages[randomNum].url
    this.setState({randomImg:randomMemeImg})
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}> 
          <input
            type="text"
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />

          <button> Generate Meme </button>

          <div>
            <h2>{this.state.topText}</h2>
            <h2>{this.state.bottomText}</h2>
            <img src={this.state.randomImg} alt="" />
          </div>
        </form>
      </div>
      
    )
  }
}

export default MemeGenerator