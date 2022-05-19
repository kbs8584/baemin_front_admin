import { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  Tabs,
  Tab,
  Container,
  ImageList,
  ImageListItem,
  ButtonGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { TabContext, TabPanel } from "@mui/lab";
import { CheckBox } from "@mui/icons-material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function GallaryModal() {
  const INITIAL_VALUE = "1";
  const INITIAL_SUB_VALUE = "1";
  const [value, setValue] = useState(INITIAL_VALUE);
  const [subValue, setSubValue] = useState(INITIAL_SUB_VALUE);

  const createData = (id, name, image) => ({
    id,
    name,
    image,
  });

  const imageCategoryList = [
    createData("1", "시즌", [
      {
        imageId: "1",
        imageName: "생일01",
        imageURL:
          "https://i.pinimg.com/originals/dc/0e/a3/dc0ea333ec91b82a0b706dd977d84906.jpg",
      },
      {
        imageId: "2",
        imageName: "생일02",
        imageURL:
          "https://d3kxs6kpbh59hp.cloudfront.net/community/COMMUNITY/cc687c9133ff431d99d7ba5cc252ae4b/580deb542be4476eba319e2f19d31b06_1649592109.jpg",
      },
      {
        imageId: "3",
        imageName: "생일03",
        imageURL:
          "https://d3kxs6kpbh59hp.cloudfront.net/community/COMMUNITY/eb89e2fa38834e61abf0cd45f7f5d590/289149d4b7704985a93f78663834fe64_1649248695.png",
      },
      {
        imageId: "4",
        imageName: "생일04",
        imageURL:
          "https://cdn.crowdpic.net/detail-thumb/thumb_d_7E318A19CF49E428F7D458A803F5311C.jpg",
      },
      {
        imageId: "5",
        imageName: "생일05",
        imageURL:
          "https://vrthumb.imagetoday.co.kr/2015/03/25/tid114t000407.jpg",
      },
    ]),
    createData("2", "돈가스/회/일식", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("3", "중식", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("4", "치킨", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("5", "백반/죽/국수", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("6", "카페/디저트", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("7", "분식", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("8", "찜/탕/찌개", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("9", "피자", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("10", "양식", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("11", "고기/구이", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("12", "족발/보쌈", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("13", "아시안", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("14", "패스트푸드", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("15", "야식", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
    createData("16", "도시락", [
      {
        imageId: "1",
        imageName: "상황01",
        imageURL:
          "https://previews.123rf.com/images/pa3x/pa3x1604/pa3x160400738/56373471-welcome-inscription-greeting-card-with-calligraphy-hand-drawn-lettering-design-photo-overlay-typogra.jpg",
      },
    ]),
  ];

  const handleValueChange = (e, value) => {
    setSubValue(INITIAL_SUB_VALUE);
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
    <Container>
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
          >
            선택 삭제
          </Button>
          <Button
            variant="contained"
            sx={{ height: "28px", padding: 3, fontWeight: "fontWeight" }}
          >
            이미지 추가
          </Button>
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
              {imageCategoryList.map((listItem) => (
                <Tab
                  key={listItem.id}
                  label={listItem.name}
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
              ))}
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
                {imageCategoryList[value - 1].image.map((listItem) => (
                  <ImageListItem
                    component="div"
                    value={listItem.imageName}
                    key={`${value}${subValue}${listItem.imageId}`}
                    sx={{
                      position: "relative",
                      border: 3,
                      borderRadius: "10px",
                      borderColor: "grey.100",
                      aspectRatio: "1/1",
                    }}
                  >
                    {/* <HighlightOffIcon
                      sx={{
                        borderRadius: "100%",
                        border: "none !important",
                        borderColor: "common.black",
                        color: "common.white",
                        backgroundColor: "common.black",
                      }}
                    /> */}
                    <FormControlLabel
                      sx={{
                        margin: "auto",
                      }}
                      label={
                        <img
                          label="haha"
                          src={listItem.imageURL}
                          alt={listItem.imageId}
                          loading="lazy"
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "10px",
                            objectFit: "contain",
                          }}
                        />
                      }
                      control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon />}
                          checkedIcon={<CheckBoxOutlineBlankIcon />}
                          id="haha"
                          sx={{
                            width: "10px",
                            height: "10px",
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            color: "primary.main",
                            "&.Mui-checked": {
                              borderRadius: 1,
                              backgroundColor: "primary.main",
                            },
                          }}
                          onClick={() => {
                            console.log(listItem.imageId);
                          }}
                        />
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </Container>
  );
}
