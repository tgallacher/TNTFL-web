
var PlayerName = React.createClass({
  render: function() {
    var className = classNames(
      'playerName',
      this.props.colour,
      this.props.yellow ? 'yellow-stripe' : '',
      this.props.width
    );
    return (
      <div className={className}>
        <a href={this.props.href}>
          {this.props.children}
        </a>
      </div>
    );
  }
});

var GameAchievements = React.createClass({
  render: function() {
    var className = classNames(
      'gameAchievements',
      this.props.yellow ? 'yellow-stripe' : '',
      this.props.width
    );
    var cups = this.props.achievements.map(function(ach) {
      return (
        <img src="img/trophy5_24.png" alt="Achievement unlocked!" title="Achievement unlocked!"/>
      );
    });
    return (
      <div className={className}>
        {cups}
      </div>
    );
  }
});

var GameScore = React.createClass({
  render: function() {
    var className = classNames(
      'gameScore',
      this.props.yellow ? 'yellow-stripe' : '',
      this.props.width
    );
    return (
      <div className={className}>
        {this.props.redScore} - {this.props.blueScore}
      </div>
    );
  }
});

var GameTime = React.createClass({
  render: function() {
    function theTime(epoch) {
      var date = new Date(epoch * 1000);
      return (
        date.getFullYear() + "-" +
        (date.getMonth() + 1) + "-" +
        date.getDate() + " " +
        date.getHours() + ":" +
        date.getMinutes()
      );
    }
    return (
      <a href={this.props.date}>
        {theTime(this.props.date)}
      </a>
    );
  }
});

var SkillChange = React.createClass({
  render: function() {
    var className = classNames(
      'skillChange',
      'skill-change',
      this.props.colour
    );
    return (
      <span className={className}>
        +{(this.props.skillChange).toFixed(3)}
      </span>
    );
  }
});

var RankChange = React.createClass({
  render: function() {
    var className = classNames(
      'rankChange',
      'skill-change',
      this.props.colour
    );
    return (
      <span className={className}>
        +{this.props.rankChange}
      </span>
    );
  }
});

var GameRecord = React.createClass({
  render: function() {
    var redStripe = this.props.data.red.score == 10 && this.props.data.blue.score == 0;
    var blueStripe = this.props.data.red.score == 0 && this.props.data.blue.score == 10;
    return (
      <div className="gameRecord recent-game container-fluid">
        <div className="row recent-game-result">
          <PlayerName href={this.props.data.red.href} colour="red-player" yellow={redStripe} width="col-md-4">
            {this.props.data.red.name}
          </PlayerName>
          <GameAchievements achievements={this.props.data.red.achievements} yellow={redStripe} width="col-md-1"/>
          <GameScore redScore={this.props.data.red.score} blueScore={this.props.data.blue.score} width="col-md-2" yellow={redStripe || blueStripe}/>
          <GameAchievements achievements={this.props.data.blue.achievements} yellow={blueStripe} width="col-md-1"/>
          <PlayerName href={this.props.data.blue.href} colour="blue-player" yellow={blueStripe} width="col-md-4">
            {this.props.data.blue.name}
          </PlayerName>
        </div>
        <div className="row">
          <div className="col-md-2">
            {this.props.data.red.rankChange != 0 ? <RankChange rankChange={this.props.data.red.rankChange} colour="skill-change-red"/> : null}
          </div>
          <div className="col-md-2">
            {this.props.data.red.skillChange > 0 ? <SkillChange skillChange={this.props.data.red.skillChange} colour="skill-change-red"/> : null}
          </div>
          <div className="col-md-4">
            <GameTime date={this.props.data.date}/>
          </div>
          <div className="col-md-2">
            {this.props.data.blue.skillChange >= 0 ? <SkillChange skillChange={this.props.data.blue.skillChange} colour="skill-change-blue"/> : null}
          </div>
          <div className="col-md-2">
            {this.props.data.blue.rankChange != 0 ? <RankChange rankChange={this.props.data.blue.rankChange} colour="skill-change-blue"/> : null}
          </div>
        </div>
      </div>
    );
  }
});
window.GameRecord = GameRecord;


var PageNavigation = React.createClass({
  render: function() {
    return (
      <div className="pageNavigation">
        <ul className="nav navbar-nav">
          <li><a href="">Home</a></li>
          <li><a href="stats/">Stats</a></li>
          <li><a href="speculate/">Speculate</a></li>
          <li><a href="api/">API</a></li>
        </ul>
      </div>
    );
  }
});

var AddGameForm = React.createClass({
  getInitialState: function() {
    return {redPlayer: 'Red', redScore: 0, bluePlayer: 'Blue', blueScore: 0};
  },
  handleRedPlayerChange: function(e) {
    this.setState({redPlayer: e.target.value});
  },
  handleRedScoreChange: function(e) {
    this.setState({redScore: e.target.value, blueScore: 10 - e.target.value});
  },
  handleBluePlayerChange: function(e) {
    this.setState({bluePlayer: e.target.value});
  },
  handleBlueScoreChange: function(e) {
    this.setState({blueScore: e.target.value});
  },
  render: function() {
    return (
      <div className="addGameForm">
        <form className="navbar-form navbar-right game-entry" method="post" action="game/add/">
          <div className="form-group">
            <input
              type="text"
              name="redPlayer"
              className="form-control red player"
              value={this.state.redPlayer}
              onChange={this.handleRedPlayerChange}
            />
            <input
              type="text"
              name="redScore"
              className="form-control red score"
              maxLength="2"
              value={this.state.redScore}
              onChange={this.handleRedScoreChange}
            /> - <input
              type="text"
              name="blueScore"
              className="form-control blue score"
              maxLength="2"
              value={this.state.blueScore}
              onChange={this.handleBlueScoreChange}
            />
            <input
              type="text"
              name="bluePlayer" 
              className="form-control blue player"
              value={this.state.bluePlayer}
              onChange={this.handleBluePlayerChange}
            />
          </div>
          <button type="submit" className="btn btn-default">
            Add game <span className="glyphicon glyphicon-triangle-right"/>
          </button>
        </form>
      </div>
    );
  }
});

var NavigationBar = React.createClass({
  render: function() {
    return (
      <div className="navigationBar">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <p className="navbar-text tntfl-header">Table Football Ladder</p>
            <PageNavigation/>
            <AddGameForm/>
          </div>
        </nav>
      </div>
    );
  }
});
window.NavigationBar = NavigationBar;
