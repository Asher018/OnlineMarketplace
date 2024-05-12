import { Router, Request, Response, NextFunction } from "express";
import { PassportStatic } from "passport";
import { User } from "../model/User";
import { Item } from "../model/Item";
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // Adjust the maximum file size as needed (10MB in this example)
  },
});
export const configureRoutes = (
  passport: PassportStatic,
  router: Router
): Router => {
  router.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello, World!");
  });

  router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (error: string | null, user: typeof User) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        } else {
          if (!user) {
            res.status(400).send("User not found.");
          } else {
            req.login(user, (err: string | null) => {
              if (err) {
                console.log(err);
                res.status(500).send("Internal server error.");
              } else {
                res.status(200).send(user);
              }
            });
          }
        }
      }
    )(req, res, next);
  });

  router.post("/register", (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;
    const nickname = req.body.nickname;
    const role = req.body.role;
    const user = new User({
      email: email,
      password: password,
      name: name,
      address: address,
      nickname: nickname,
      role: role,
    });
    user
      .save()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.post("/itemUpload", (req: any, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const name = req.body.name;
        const price = Number(req.body.price);
        const description = req.body.description;
        const image = req.body.image;
        const owner = req.body.owner;
        const boughtBy = req.body.boughtBy;

        const newItem = new Item({
          name: name,
          price: price,
          description: description,
          image: image,
          owner: owner,
          boughtBy: boughtBy,
        });

        newItem
          .save()
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      } catch (error) {
        console.error("Error uploading item:", error);
        res.status(500).send(error);
      }
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  router.post('/uploadImage', upload.single('file'), (req: any, res: any) => {
    // Handle the uploaded file
    let file = req.file;
    console.log(file)
    console.log(file.name)
    if (!file) {
      res.status(400).send('No file uploaded.');
      return;
    }
  
    // Define the destination directory where the file will be saved
    const destinationDirectory = 'uploads/';
  
    // Define the new filename for the uploaded file (you can customize this as needed)
    const newFileName = `${Date.now()}_${file.name}`;
  
    // Construct the full path where the file will be saved
    const filePath = path.join(destinationDirectory, newFileName);
  
    // Use fs.rename to move the temporary file to its new location and name
    fs.rename(file.path, filePath, (err: any) => {
      if (err) {
        console.error('Error saving file:', err);
        res.status(500).send('Error saving file.');
        return;
      }
  
      // File saved successfully, send back a success response with the file path
      res.status(200).json({ filePath });
    });
  });

  router.post("/buyItem", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const itemId = req.body.itemId;
        const boughtBy = req.body.boughtBy;
        const query = Item.findById(itemId);
        query
          .then((data) => {
            if (data) {
              if (data.boughtBy !== "") {
                res.status(500).send("item is already bought");
              }
              data.boughtBy = boughtBy;
              data
                .save()
                .then((data) => {
                  res.status(200).send(data);
                })
                .catch((error) => {
                  res.status(500).send(error);
                });
            } else {
              res.status(500).send("No item found");
            }
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      } catch (error) {
        console.error("Error buying item:", error);
        res.status(500).send(error);
      }
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  router.post("/logout", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      req.logout((error) => {
        if (error) {
          console.log(error);
          res.status(500).send("Internal server error.");
        }
        res.status(200).send("Successfully logged out.");
      });
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  router.get("/getAllUsers", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const query = User.find();
      query
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error.");
        });
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  router.get("/getItems", (req: Request, res: Response) => {
    const query = Item.find();
    query
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Internal server error.");
      });
  });

  router.post("/getMyItems", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const owner = req.body.owner;
      const query = Item.find({owner: owner});
      query.then((data) => {
        res.status(200).send(data);
      }).catch((error) => {
        res.status(500).send(error);
      })
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  router.post("/getMyBoughtItems", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const boughtBy = req.body.boughtBy;
      const query = Item.find({boughtBy: boughtBy});
      query.then((data) => {
        res.status(200).send(data);
      }).catch((error) => {
        res.status(500).send(error);
      })
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  router.get("/checkAuth", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      res.status(200).send(true);
    } else {
      res.status(500).send(false);
    }
  });

  router.get("/getCurrentUser", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const query = User.findById(req.user);
      query
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error.");
        });
    } else {
      res.status(200).send(null);
    }
  });

  router.delete("/deleteUser", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const id = req.query.id;
      const query = User.deleteOne({ _id: id });
      query
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error.");
        });
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  return router;
};
