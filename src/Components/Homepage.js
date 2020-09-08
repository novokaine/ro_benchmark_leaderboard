import React from 'react';
import { Collapse } from 'react-collapse';
import data from '../data/homepage.json';
import './Homepage.scss';
import UrlBuilder from './UrlBuilder.js';

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.urlBuilder = new UrlBuilder();
    this.state = {
      activeArea: null,
    };
  }

  updateactiveArea(name) {
    const { activeArea } = this.state;
    this.setState({
      activeArea: name !== activeArea ? name : null,
    });
  }

  renderDataset(dataset) {
    return (
      <tr>
        <td>{dataset.dataset}</td>
        <td>{dataset.submission_count}</td>
      </tr>
    );
  }

  renderAreaTask(task) {
    return (
      <a href={this.urlBuilder.buildTaskUrl(task.name)} className="task-tile-link">
        <div className="task-tile" key={task.name}>
          <h5>{task.name}</h5>
          <hr />
          <div className="task-data">
            <table>
              <thead>
                <tr>
                  <th>Dataset</th>
                  <th>Submissions</th>
                </tr>
              </thead>
              <tbody>{task.datasets.map((ds) => this.renderDataset(ds))}</tbody>
            </table>
          </div>
        </div>
      </a>
    );
  }

  renderArea(area) {
    const { activeArea } = this.state;
    const { tasks, name } = area;

    const isTileOpened = activeArea === name;

    return (
      <div className="tile-wrapper">
        <div onClick={() => this.updateactiveArea(name)} className="collapse-trigger">
          <h4>{area.name}</h4>
        </div>
        <Collapse isOpened={isTileOpened}>
          <div className="task-wrapper">
            {tasks.map((currentTask) => this.renderAreaTask(currentTask))}
            <div className="clear" />
          </div>
        </Collapse>
      </div>
    );
  }

  render() {
    const { areas } = data;
    if (!this.state.activeArea) {
      const defaultArea = areas[0];
      this.state.activeArea = defaultArea.name;
    }
    return areas.map((area) => this.renderArea(area));
  }
}

export default Homepage;
