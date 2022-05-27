import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Tabs,
  Tab,
  Box,
  Container,
  ImageList,
  ImageListItem,
  FormControlLabel,
  Checkbox,
  Input,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ClearIcon from "@mui/icons-material/Clear";
import {
  getGalleryImage,
  addGalleryImage,
  deleteGalleryImage,
  deleteCheckedGalleryImages,
} from "api/auth";
import { imageCategoryList } from "constant/galleryCategory";

export default function GallaryModal() {
  const INITIAL_VALUE = "1";
  const [value, setValue] = useState(INITIAL_VALUE);

  const [imageList, setImageList] = useState([]);
  const [imageListUpdated, setImageListUpdated] = useState();
  const [checkedImageSeqNo, setCheckedImageSeqNo] = useState([-1]);

  useEffect(() => {
    getGalleryImage(value).then((data) => setImageList(data.list));
  }, [value, imageListUpdated]);

  console.log("이미지리스트", imageList);
  function deleteDummyData() {
    const newArray = [...checkedImageSeqNo];
    newArray.shift();
    setCheckedImageSeqNo(newArray);
  }
  console.log("out", checkedImageSeqNo);

  function addCheckedImageToDelete(listItem) {
    checkedImageSeqNo.forEach((checked, index) => {
      if (listItem.seqNo === checked) {
        console.log("index", index);
        let newArray = [...checkedImageSeqNo];
        newArray.splice(index, 1);
        setCheckedImageSeqNo(newArray);
        console.log(checkedImageSeqNo);

        // const newArray = checkedImageSeqNo.filter((item) => {
        //   return listItem.seqNo !== item;
        // });
        // setCheckedImageSeqNo(newArray);
      } else {
        setCheckedImageSeqNo([...checkedImageSeqNo, listItem.seqNo]);
      }
    });
  }
  const addImage = async (e) => {
    const currentFile = e.target.files[0];
    var imageFileData = new FormData();
    imageFileData.append("file", currentFile);
    imageFileData.append("mainCategory", value);
    const res = await addGalleryImage(imageFileData);
    setImageListUpdated(res);
  };

  const deleteImage = async (listItem) => {
    const seqNo = listItem.seqNo;
    const res = await deleteGalleryImage(seqNo);
    setImageListUpdated(res);
  };
  const deleteCheckedImages = async (seqNo) => {
    const res = await deleteCheckedGalleryImages(seqNo);
    setImageListUpdated(res);
  };

  const handleValueChange = (e, value) => {
    setValue(value);
    e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.scrollTo(
      {
        top: 0,
        behavior: "smooth",
      }
    );
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Container sx={{ marginBottom: 5 }}>
      <Grid container pt={2} mb={4} sx={{ justifyContent: "space-between" }}>
        <Grid item component="h1" sx={{ fontSize: "subtitle1.fontSize" }}>
          배민 갤러리
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            sx={{
              height: "28px",
              padding: 3,
              marginRight: 3,
              borderColor: "primary.alert",
              color: "primary.alert",
              fontWeight: "fontWeight",
              "&:hover": {
                borderColor: "primary.alert",
                backgroundColor: "primary.alertBg",
              },
            }}
            onClick={() => {
              deleteCheckedImages(checkedImageSeqNo);
            }}
          >
            선택 삭제
          </Button>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              sx={{ display: "none" }}
              onChange={addImage}
            />
            <Button
              variant="contained"
              component="span"
              sx={{ height: "28px", padding: 3, fontWeight: "fontWeight" }}
            >
              이미지 추가
            </Button>
          </label>
        </Grid>
      </Grid>
      <TabContext value={value}>
        <Grid container>
          <Grid item xs={2} md={2}>
            <Tabs
              onChange={handleValueChange}
              aria-label="lab API tabs example"
              orientation="vertical"
              value={value}
              TabIndicatorProps={{ style: { backgroundColor: "transparent" } }}
            >
              {imageCategoryList.map((listItem) => {
                return (
                  <Tab
                    key={listItem.id}
                    label={listItem.title}
                    value={listItem.id}
                    sx={{
                      border: 1,
                      borderColor: "grey.200",
                      bgcolor: "grey.50",
                      "&.Mui-selected": {
                        borderRadius: 1,
                        backgroundColor: "common.white",
                      },
                    }}
                  />
                );
              })}
            </Tabs>
          </Grid>
          <Grid item xs={10} md={10}>
            <TabPanel value={value} sx={{ padding: "0" }}>
              <ImageList
                sx={{
                  width: "100%",
                  paddingLeft: 3,
                }}
                component="div"
                cols={4}
                gap={10}
              >
                {imageList &&
                  imageList.map((listItem) => (
                    <FormControlLabel
                      key={`${value}${listItem.seqNo}`}
                      sx={{
                        width: "100%",
                        position: "relative",
                        margin: "auto",
                        alignItems: "start",
                        "span:nth-of-type(2)": {
                          width: "100%",
                        },
                      }}
                      label={
                        <>
                          <ImageListItem
                            component="div"
                            value={listItem.seqNo}
                            sx={{
                              grid: 1,
                              position: "relative",
                              border: 3,
                              borderRadius: "10px",
                              borderColor: "grey.100",
                              aspectRatio: "1/1",
                            }}
                          >
                            <img
                              src={listItem.fullUrl}
                              alt={listItem.seqNo}
                              loading="lazy"
                              style={{
                                display: "block",
                                width: "100%",
                                height: "100%",
                                borderRadius: "10px",
                                objectFit: "contain",
                              }}
                            />
                          </ImageListItem>
                          <ClearIcon
                            sx={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              zIndex: 2,
                              width: "20px",
                              height: "auto",
                              borderRadius: "100%",
                              backgroundColor: "common.black",
                              color: "common.white",
                            }}
                            onClick={() => deleteImage(listItem)}
                          />
                        </>
                      }
                      control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon />}
                          checkedIcon={<CheckBoxOutlineBlankIcon />}
                          id="haha"
                          sx={{
                            width: "10px",
                            height: "10px",
                            position: "relative",
                            zIndex: "1",
                            top: "10px",
                            left: "30px",
                            color: "primary.main",
                            "&.Mui-checked": {
                              borderRadius: 1,
                              backgroundColor: "primary.main",
                            },
                          }}
                          onClick={() => {
                            addCheckedImageToDelete(listItem);
                          }}
                        />
                      }
                    />
                  ))}
              </ImageList>
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </Container>
  );
}
