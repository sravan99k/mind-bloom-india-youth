
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Plus, Send, Clock, Users } from "lucide-react";

export const AnonymousForum = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  };

  const fetchReplies = async (postId: string) => {
    const { data, error } = await supabase
      .from('forum_replies')
      .select('*')
      .eq('post_id', postId)
      .eq('is_approved', true)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setReplies(data);
    }
  };

  const handleCreatePost = async () => {
    if (!user || !newPost.title.trim() || !newPost.content.trim()) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from('forum_posts')
      .insert({
        user_id: user.id,
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        is_anonymous: true,
        is_approved: false // Requires moderation
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Post Submitted!",
        description: "Your post is being reviewed and will appear once approved.",
      });
      setNewPost({ title: "", content: "" });
      setShowCreatePost(false);
    }

    setIsSubmitting(false);
  };

  const handleCreateReply = async () => {
    if (!user || !selectedPost || !newReply.trim()) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from('forum_replies')
      .insert({
        post_id: selectedPost.id,
        user_id: user.id,
        content: newReply.trim(),
        is_anonymous: true,
        is_approved: false // Requires moderation
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post reply. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Reply Submitted!",
        description: "Your reply is being reviewed and will appear once approved.",
      });
      setNewReply("");
    }

    setIsSubmitting(false);
  };

  const openPost = (post: any) => {
    setSelectedPost(post);
    fetchReplies(post.id);
  };

  if (selectedPost) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                {selectedPost.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Anonymous Student
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(selectedPost.created_at).toLocaleDateString()}
                </span>
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => setSelectedPost(null)}>
              Back to Forum
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Replies ({replies.length})</h3>
            
            {replies.map((reply) => (
              <div key={reply.id} className="border-l-4 border-blue-200 pl-4 py-2">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">Anonymous Student</Badge>
                  <span className="text-sm text-gray-500">
                    {new Date(reply.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{reply.content}</p>
              </div>
            ))}

            {user && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Add a Reply</h4>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Share your thoughts or support..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    className="min-h-20"
                  />
                  <Button 
                    onClick={handleCreateReply}
                    disabled={isSubmitting || !newReply.trim()}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Posting..." : "Post Reply"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              Anonymous Support Forum
            </CardTitle>
            <CardDescription>
              Share experiences and support each other anonymously
            </CardDescription>
          </div>
          {user && (
            <Button 
              onClick={() => setShowCreatePost(!showCreatePost)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showCreatePost && user && (
          <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-4 text-blue-800">Create Anonymous Post</h3>
            <div className="space-y-4">
              <Input
                placeholder="Post title..."
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              />
              <Textarea
                placeholder="Share your thoughts, experiences, or ask for support..."
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="min-h-24"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleCreatePost}
                  disabled={isSubmitting || !newPost.title.trim() || !newPost.content.trim()}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {isSubmitting ? "Submitting..." : "Submit for Review"}
                </Button>
                <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No posts yet. Be the first to start a conversation!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div 
                key={post.id} 
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => openPost(post)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <Badge variant="secondary">Anonymous</Badge>
                </div>
                <p className="text-gray-600 line-clamp-2 mb-3">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    View Discussion
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
