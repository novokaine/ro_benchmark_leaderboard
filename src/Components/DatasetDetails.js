import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './DatasetDetails.scss';
import UrlBuilder from './UrlBuilder';
import PlotBuilder from './PlotBuilder';
import ModelScoresTable from './ModelScoresTable';
import data from '../data/datasets.json';

class DatasetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.datasetId = props.match.params.id;
    this.dataset = data.datasets.find((ds) => ds.id === this.datasetId);
    this.urlBuilder = new UrlBuilder();
  }

  render() {
    return (
      <>
        <h3 className="dataset-title">{this.dataset.dataset_name}</h3>
        <div className="dataset-description">{ReactHtmlParser(this.dataset.dataset_description)}</div>
        <table className="dataset-info">
          <tbody>
            <tr>
              <th>Source</th>
              <td>
                <a href={this.dataset.dataset_link} target="_blank" rel="noopener noreferrer">
                  {this.dataset.dataset_link}
                </a>
              </td>
            </tr>
            <tr>
              <th>License</th>
              <td>
                {this.dataset.license_url ? (
                  <a href={this.dataset.license_url} target="_blank" rel="noopener noreferrer">
                    {this.dataset.license}
                  </a>
                ) : (
                  this.dataset.license
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="add-model-link">
          <a href={UrlBuilder.submitPageUrl}>Add model</a>
        </div>
        <PlotBuilder dataset={this.dataset} />
        <ModelScoresTable models={this.dataset.models} metrics={this.dataset.metrics} />
      </>
    );
  }
}

export default DatasetDetails;
