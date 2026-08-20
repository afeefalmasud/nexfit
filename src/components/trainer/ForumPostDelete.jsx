"use client";

import {AlertDialog, Button} from "@heroui/react";
import { FiTrash2 } from 'react-icons/fi';


export function PostDelete({postId}) {
    const handleDelete = async() => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forum/${postId}`,{
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            }
        })
        const data = res.json();
        window.location.reload();
    }
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <button
            type="button"
            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 font-semibold transition-colors cursor-pointer"
        >
            <FiTrash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-105 rounded-2xl border border-white/10 bg-[#111920] text-white shadow-2xl">
            <AlertDialog.CloseTrigger className="text-gray-400 hover:text-white" />

            <AlertDialog.Header>
                <AlertDialog.Icon
                status="danger"
                className="bg-red-500/20 text-red-400"
                />
                <AlertDialog.Heading className="text-xl font-bold text-white">
                Cancel Post?
                </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
                <p className="text-gray-400 leading-7">
                Are you sure you want to delete this post? This action cannot be
                undone, and you'll need to make a new post if you change your mind.
                </p>
            </AlertDialog.Body>

            <AlertDialog.Footer className="gap-3">
                <Button
                slot="close"
                variant="bordered"
                className="border-white/15 text-gray-300 hover:bg-white/5"
                >
                Keep Post
                </Button>

                <Button
                onClick={handleDelete}
                slot="close"
                className="bg-red-600 text-white hover:bg-red-700"
                >
                Delete Post
                </Button>
            </AlertDialog.Footer>
            </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}