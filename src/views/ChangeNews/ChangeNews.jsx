import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import CustomSelect from "../../components/CustomInput/CustomSelect.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import axios from "axios";
import config from "../../config.js";
import style from "../../style.js";

//ckeditor
import CKEditor from 'react-ckeditor-component'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class ChangeNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsCategories: "",
      newsSite: "",
      newsTitle: "",
      newsTags: "",
      newsDecriptions: "",
      newsImageURL: "",
      newsImage: {},
      listCategory: [],
      newsContent: "",
      loading1: true,
      loading2: true,
      errImage: ""
    }
  }
  componentDidMount = () => {
    axios.get(`${config.apiBaseURL}/api/news/${this.props.newsID}`)
    .then(response => {
      let newsTags = response.data.keywords.join();
      this.setState({
        newsTitle: response.data.title,
        newsDecriptions: response.data.description,
        newsTags: newsTags,
        newsSite: response.data.site,
        newsImageURL: response.data.thumbnail,
        loading1: false,
        newsContent: response.data.content,
        newsCategories: response.data.category
      })
    })
    .catch(error => {
      console.log(error);
      this.setState({ loading1: false});
    })
    axios.get(`${config.apiBaseURL}/api/news/category`)
    .then(response => {
      let listCategory = response.data.items.map(x => {
        return {
          value: x.id,
          text: x.name
        }
      })
      this.setState({
        listCategory: listCategory,
        loading2: false
      })
    })
    .catch(error => {
      console.log(error)
      this.setState({ loading2: false })
    })
  }
  handleClickAddImage = () => {
    document.getElementById('input-image').click()
  }
  // handleUploadNewsImage = selectorFiles => {
  //   if (this.state.newsImage !== {}) {
  //       this.setState( {loading: true} )
  //       var file = selectorFiles[0]
  //       var reader = new FileReader()
  //       reader.onloadend = () => {
  //         // axios.post(`${config.apiBaseURL}/api/stadium/upload`, {
  //         //   "image": reader.result,
  //         //   "stadiumID": this.state.userInfo.default_stadium_id
  //         // }, {
  //         //   'headers': {
  //         //     'Authorization': this.state.userInfo.token,
  //         //     'Content-Type': 'application/json'
  //         //   }
  //         // })
  //         // .then(response => {
  //         //   let lst = [...this.state.imageList, response.data.url]
  //         //   //this.props.handleChangeImage(lst)
  //         //   this.setState({
  //         //     imageList: lst,
  //         //     loading: false,
  //         //     errAddImage: ""
  //         //   })
  //         // })
  //         // .catch(error => {
  //         //   this.setState( {loading: false} )
  //         // })
  //       }
  //       reader.readAsDataURL(file)
  //     }
  //   }
  // }
  handleChange = (e) => this.setState({ [e.target.id]: e.target.value })
  handleChangeSelect = (e) => this.setState({ [e.target.name]: e.target.value })
  handleChangeNewsImageFile = selectorFiles => {
    if (selectorFiles.length > 0)
      if (selectorFiles[0].name.endsWith(".gif") || selectorFiles[0].name.endsWith(".jpg") || selectorFiles[0].name.endsWith(".jpeg") || selectorFiles[0].name.endsWith(".tiff") || selectorFiles[0].name.endsWith(".png")) {
        this.setState({
          newsImage: selectorFiles[0],
          errImage: ""
        }, console.log(this.state.newsImage))
      }
      else this.setState({ errImage: "*Vui lòng chọn file ảnh!"})
  }
  onChange = evt => {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.setState({
      newsContent: newContent
    })
  }
  onBlur = evt => {
    console.log("onBlur event called with event info: ", evt);
  }
  afterPaste = evt => {
    console.log("afterPaste event called with event info: ", evt);
  }
  handleUpdateNews = () => {
    // axios.put(`${config.apiBaseURL}/api/news/${this.props.newsID}`, {
      
    // })
  }
  render() {
    const { classes } = this.props;
    const optionsSite = [
      {
        value: "all",
        text: "All"
      },
      {
        value: "met.com.vn",
        text: "met.com.vn"
      },
      {
        value: "mettv.vn",
        text: "mettv.vn"
      },
      {
        value: "tapchifutsal.vn",
        text: "tapchifutsal.vn"
      }
    ]
    if (!this.state.loading1 && !this.state.loading2) {
      return (
        <div>
          <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{this.state.newsTitle}</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                handleChange={this.handleChange}
                value={this.state.newsTitle}
                labelText="Tiêu đề"
                id="newsTitle"
                formControlProps={{
                  fullWidth: true
                }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                value={this.state.newsTags}
                handleChange={this.handleChange}
                labelText="Gắn thẻ"
                id="newsTags"
                formControlProps={{
                  fullWidth: true
                }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                value={this.state.newsDecriptions}
                handleChange={this.handleChange}
                labelText="Mô tả"
                id="newsDecriptions"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  multiline: true,
                  rows: 3
                }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomSelect
                value={this.state.newsCategories}
                lstItem={this.state.listCategory}
                handleChangeSelect={this.handleChangeSelect}
                labelText="Loại tin tức"
                id="newsCategories"
                formControlProps={{
                  fullWidth: true
                }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={8}>
                <CustomSelect
                value={this.state.newsSite}
                lstItem={optionsSite}
                handleChangeSelect={this.handleChangeSelect}
                labelText="Trang"
                id="newsSite"
                formControlProps={{
                  fullWidth: true
                }}
                />
              </GridItem>
              <GridItem style={style.newsFieldPlace} xs={12} sm={12} md={12}>
                <GridContainer>
                  <Grid item style={style.padding0} xs={12} sm={12} md={12}>
                    <div style={style.divAsLabel}>Hình ảnh</div>
                  </Grid>
                  <Grid item style={style.padding0} xs={12} sm={12} md={12}>
                    <img alt="" style={style.maxWidth100} src={this.state.newsImageURL}/>
                  </Grid>
                  <Grid item style={style.padding0} xs={12} sm={12} md={12}>
                    <Button onClick={this.handleClickAddImage}>{(this.state.newsImageURL !== "")?"Thay đổi ảnh":"Đăng ảnh"}</Button>
                    <input style={style.displayNone} id="input-image" ref={this.textInput}
                    onChange={ (e) => this.handleChangeNewsImageFile(e.target.files)} type="file" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <div style={(this.state.errImage === "")?style.displayNone:style.errClass}>{this.state.errImage}</div>
                  </Grid>
                </GridContainer>
              </GridItem>
              <GridItem style={style.newsFieldPlace} xs={12} sm={12} md={12}>
                <div style={style.divAsLabel}>Nội dung</div>
                <CKEditor
                  activeClass="editor" content={this.state.newsContent}
                  events={{
                    "blur": this.onBlur,
                    "afterPaste": this.afterPaste,
                    "change": this.onChange
                  }}/>
              </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={this.handleUpdateNews}>Cập nhật</Button>
            </CardFooter>
            </Card>
          </GridItem>
          </GridContainer>
        </div>
      )
    }
    else {
      return (<div style={style.CircularProgressDiv}><CircularProgress style={style.CircularProgress} className={classes.progress} /></div>)
    }
  }
}

export default withStyles(styles)(ChangeNews);
