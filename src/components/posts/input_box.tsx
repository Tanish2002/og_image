"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Trash2 } from "react-feather";

import { useInsertPost } from "@/api/posts/mutations";
const TweetInput = () => {
  const addPost = useInsertPost();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [validation, setValidation] = useState<"valid" | "invalid">("valid");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
    imageRef.current!.value = "";
  };

  useEffect(() => {
    handleRemoveImage();
  }, [addPost.isSuccess]);

  return (
    <Card>
      <CardBody className="grid grid-cols-[5fr_95fr]">
        <Avatar showFallback className="mr-5 mt-3" src={""} />
        <form
          action={addPost.mutate}
          onSubmit={(e) => {
            if (content === "" || title === "") {
              e.preventDefault();
              setValidation("invalid");
              setSelectedImage(null);
              setTitle("");
              setContent("");

              return false;
            }
            setValidation("valid");
            setContent("");
            setTitle("");
            setSelectedImage(null);

            return true;
          }}
        >
          <div className="flex flex-col gap-5">
            <Input
              required
              label="Title"
              name="title"
              type="text"
              validationState={validation}
              value={title}
              onValueChange={(e) => setTitle(e)}
            />
            <Textarea
              required
              inputMode="text"
              name="content"
              placeholder="What's happening?!"
              validationState={validation}
              value={content}
              onValueChange={(e) => setContent(e)}
            />
          </div>
          {selectedImage && (
            <img
              alt="Selected"
              className="rounded-lg my-4"
              src={selectedImage}
            />
          )}

          <div className="flex justify-between mt-2">
            <div className="flex gap-2">
              <Button isIconOnly aria-label="Image">
                {/* eslint-disable jsx-a11y/label-has-associated-control */}
                <label htmlFor="image-input">
                  <ImageIcon className="stroke-violet-400" size={20} />
                </label>
                <input
                  ref={imageRef}
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                  id="image-input"
                  multiple={false}
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                />
              </Button>
              {selectedImage && (
                <Button isIconOnly color="danger" onClick={handleRemoveImage}>
                  <Trash2 />
                </Button>
              )}
            </div>
            <Button
              color={addPost.isPending ? "secondary" : "primary"}
              isDisabled={addPost.isPending}
              isLoading={addPost.isPending}
              type="submit"
            >
              {addPost.isPending ? "Adding" : "Tweet"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default TweetInput;
