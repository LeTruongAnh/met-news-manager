import React from "react";
// @material-ui/core components
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

import config from '../../config.js'
import axios from 'axios'
import style from '../../style.js'

import { Link } from "react-router-dom";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  buttonPaddingStyle: {
    padding: "4px",
    marginBottom: "4px"
  }
};

class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screenSize: window.innerWidth,
      newsStatus: [],
      loading: true,
      lstItemsNews: [],
      rowsPerPage: 5,
      page: 0
    }
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.detectWidth)
    axios.get(`${config.apiBaseURL}/api/news/list`)
    .then((response) => {
      let lstItemsNews = response.data.items.map((x, index) => {
        let  newsStatus = this.state.newsStatus
        newsStatus.push(x.status)
        this.setState({ newsStatus: newsStatus })
        return [x.id,x.title,(x.status)?"Hoạt động":"Ẩn",x.count_view, <GridContainer style={(this.state.screenSize >= 820)?{minWidth: "133px"}:{minWidth: "0"}}>
            <GridItem xs={12} sm={6} md={6}>{this.returnChangeButton(this.props.classes.buttonPaddingStyle, x.id)}</GridItem>
            <GridItem xs={12} sm={6} md={6}>{this.returnChangeNewsStatusButton(this.props.classes.buttonPaddingStyle, index)}</GridItem>
          </GridContainer>]
      })
      this.setState({
        lstItemsNews: lstItemsNews,
        loading: false
      })
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        loading: false
      })
    })
  }
  detectWidth = () => {
    this.setState({ screenSize: window.innerWidth })
  }
  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  }
  handleChangeNewsStatus = (index) => {
    let newsStatus = this.state.newsStatus
    if (this.state.newsStatus[index] === 1)
      newsStatus[index] = 0
    else newsStatus[index] = 1
    this.setState({ newsStatus: newsStatus }, ()=>console.log(this.state.newsStatus[index]))
    //Gọi api change status
    //this.setState({ newsStatus: !this.state.newsStatus})
  }
  handleChange = (e) => this.setState({ [e.target.id]: e.target.value })
  handleChangeSelect = (e) => this.setState({ [e.target.name]: e.target.value })
  returnChangeNewsStatusButton = (className, index) => {
    return (
      <Button variant="contained" color="primary" className={className} onClick={() => this.handleChangeNewsStatus(index)}>{(this.state.newsStatus[index] === 1)?"Ẩn":"Hiện"}</Button>
    )
  }
  returnChangeButton = (className, numID) => {
    return (
      <div>
        <Link to={`/news/${numID}`}><Button variant="contained" className={className}>Sửa</Button></Link>
      </div>
    )
  }
  render() {
    const { classes } = this.props;
    if (!this.state.loading)
      return (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Quản lý tin tức</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["STT", "Tiêu đề", "Trạng thái", "Lượt xem", "Thao tác"]}
                  tableData={this.state.lstItemsNews.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)}
                  colSpan={5}
                  count={this.state.lstItemsNews.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  handleChangePage={this.handleChangePage}
                  handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                  haveFooter={true}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      );
    else
      return (<div style={style.CircularProgressDiv}><CircularProgress style={style.CircularProgress} className={classes.progress} /></div>)
  }
}

News.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(News);
