import { useEffect, useState } from "react";
import { User } from "../types/user";
import { Category, SubCategory } from "../types/category";
import {
  Collapse,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ThemeProvider,
} from "@mui/material";
import { lightTheme } from "../theme";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddSubcategoryDialog from "./createsubcategory";

export const CategoryList = (prop: {
  courseid: number | undefined;
  categories: Category[];
  user: User;
  handlechangeid: (
    categoryid: number | undefined,
    subcategoryid: number | undefined,
    postid: number | undefined
  ) => void;
}) => {
  const [categories, SetCategories] = useState<Category[]>(prop.categories);
  const opencategories = Array(prop.categories.length).fill(false);
  opencategories[0] = true;
  const [open, setOpen] = useState<boolean[]>(opencategories);
  const [selectedIndex, setSelectedIndex] = useState(
    prop.categories[0].Subcategories[0].ID
  );
  const handleItemclick = (subcategoryid: number) => {
    setSelectedIndex(subcategoryid);
  };
  useEffect(() => {
    console.log(open);
  }, []);

  const handleDropdownClick = (index: number) => {
    const change = () => {
      const temp = open.slice();
      temp[index] = !temp[index];
      return temp;
    };
    setOpen(change());
  };

  return (
    <CssBaseline>
      <ThemeProvider theme={lightTheme}>
        <List
          sx={{ overflow: "auto" }}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Categories
            </ListSubheader>
          }
        >
          {categories &&
            categories.map((category: Category, dropindex: number) => {
              return (
                <div key={category.ID}>
                  <ListItemButton
                    onClick={() => handleDropdownClick(dropindex)}
                    sx={{ color: "teal" }}
                  >
                    <ListItemText primary={category.Title}></ListItemText>
                    {open[dropindex] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <List component="div" disablePadding>
                    <Collapse in={open[dropindex]} timeout="auto" unmountOnExit>
                      {category.Subcategories &&
                        category.Subcategories.map(
                          (subcategory: SubCategory) => {
                            return (
                              <ListItemButton
                                sx={{ pl: 3 }}
                                selected={subcategory.ID === selectedIndex}
                                onClick={() => {
                                  prop.handlechangeid(
                                    category.ID,
                                    subcategory.ID,
                                    undefined
                                  );
                                  handleItemclick(subcategory.ID);
                                }}
                              >
                                <ListItemText
                                  primary={subcategory.Title}
                                ></ListItemText>
                              </ListItemButton>
                            );
                          }
                        )}
                      {prop.user && prop.user.RoleID > 1 && (
                        <ListItem
                          sx={{
                            display: "flex",
                            textAlign: "center",
                            justifyContent: "center",
                          }}
                        >
                          <AddSubcategoryDialog categoryID={category.ID} />
                        </ListItem>
                      )}
                    </Collapse>
                  </List>
                </div>
              );
            })}
        </List>
      </ThemeProvider>
    </CssBaseline>
  );
};
