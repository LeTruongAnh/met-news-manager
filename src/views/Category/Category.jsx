import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

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
      openAddModal: false,
      openDeleteModal: false,
      openChangeModal: false
    }
  }
  handleOpenAddModal = () => {
    this.setState({ openAddModal: true })
  }
  handleCloseAddModal = () => {
    this.setState({ openAddModal: false })
  }
  handleOpenDeleteModal = () => {
    this.setState({ openDeleteModal: true })
  }
  handleCloseDeleteModal = () => {
    this.setState({ openDeleteModal: false })
  }
  handleOpenChangeModal = () => {
    this.setState({ openChangeModal: true })
  }
  handleCloseChangeModal = () => {
    this.setState({ openChangeModal: false })
  }
  returnAddButton = (className) => {
    return (
      <div>
        <Button variant="contained" className={className} onClick={this.handleOpenAddModal}>Thêm</Button>
        <Modal onClose={this.handleCloseAddModal} open={this.state.openAddModal}>
          <GridContainer style={{margin: "auto"}}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>Thêm</Card>
            </GridItem>
          </GridContainer>
        </Modal>
      </div>
    )
  }
  returnDeleteButton = (className) => {
    return (
      <div>
        <Button variant="contained" color="primary" className={className} onClick={this.handleOpenDeleteModal}>Xóa</Button>
        <Modal onClose={this.handleCloseDeleteModal} open={this.state.openDeleteModal}>
          <GridContainer style={{margin: "auto"}}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>abc</Card>
            </GridItem>
          </GridContainer>
        </Modal>
      </div>
    )
  }
  returnChangeButton = (className) => {
    return (
      <div>
        <Button variant="contained" color="secondary" className={className} onClick={this.handleOpenChangeModal}>Sửa</Button>
        <Modal onClose={this.handleCloseChangeModal} open={this.state.openChangeModal}>
          <GridContainer style={{margin: "auto"}}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>abc</Card>
            </GridItem>
          </GridContainer>
        </Modal>
      </div>
    )
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Quản lý danh mục</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Country", "City", "Salary", "Thao tác"]}
                tableData={[
                  ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738", <GridContainer>
                    <GridItem xs={12} sm={4} md={4}>{this.returnAddButton(classes.buttonPaddingStyle)}</GridItem>
                    <GridItem xs={12} sm={4} md={4}>{this.returnDeleteButton(classes.buttonPaddingStyle)}</GridItem>
                    <GridItem xs={12} sm={4} md={4}>{this.returnChangeButton(classes.buttonPaddingStyle)}</GridItem>
                  </GridContainer>],
                  ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789", <GridContainer>
                    <GridItem xs={12} sm={4} md={4}>{this.returnAddButton(classes.buttonPaddingStyle)}</GridItem>
                    <GridItem xs={12} sm={4} md={4}>{this.returnDeleteButton(classes.buttonPaddingStyle)}</GridItem>
                    <GridItem xs={12} sm={4} md={4}>{this.returnChangeButton(classes.buttonPaddingStyle)}</GridItem>
                  </GridContainer>],
                  ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142", <GridContainer>
                    <GridItem xs={12} sm={4} md={4}>{this.returnAddButton(classes.buttonPaddingStyle)}</GridItem>
                    <GridItem xs={12} sm={4} md={4}>{this.returnDeleteButton(classes.buttonPaddingStyle)}</GridItem>
                    <GridItem xs={12} sm={4} md={4}>{this.returnChangeButton(classes.buttonPaddingStyle)}</GridItem>
                  </GridContainer>],
                  ["Philip Chaney", "Korea, South", "Overland Park", "$38,735", <GridContainer>
                    <GridItem xs={12} sm={4} md={4}>{this.returnAddButton(classes.buttonPaddingStyle)}</GridItem>
                    <GridItem xs={12} sm={4} md={4}>{this.returnDeleteButton(classes.buttonPaddingStyle)}</GridItem>
                    <GridItem xs={12} sm={4} md={4}>{this.returnChangeButton(classes.buttonPaddingStyle)}</GridItem>
                  </GridContainer>],
                  ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542", <GridContainer>
                    <GridItem xs={12} sm={4} md={4}>{this.returnAddButton(classes.buttonPaddingStyle)}</GridItem>
                    <GridItem xs={12} sm={4} md={4}>{this.returnDeleteButton(classes.buttonPaddingStyle)}</GridItem>
                    <GridItem xs={12} sm={4} md={4}>{this.returnChangeButton(classes.buttonPaddingStyle)}</GridItem>
                  </GridContainer>],
                  ["Mason Porter", "Chile", "Gloucester", "$78,615", <GridContainer>
                    <GridItem xs={12} sm={4} md={4}>{this.returnAddButton(classes.buttonPaddingStyle)}</GridItem>
                    <GridItem xs={12} sm={4} md={4}>{this.returnDeleteButton(classes.buttonPaddingStyle)}</GridItem>
                    <GridItem xs={12} sm={4} md={4}>{this.returnChangeButton(classes.buttonPaddingStyle)}</GridItem>
                  </GridContainer>]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(News);
