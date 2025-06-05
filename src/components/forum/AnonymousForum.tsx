
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, Users, Plus, Heart, Reply, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AnonymousForum = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", is_anonymous: true });
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [newReply, setNewReply] = useState({ content: "", is_anonymous: true });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchReplies = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('post_id', postId)
        .eq('is_approved', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setReplies(data || []);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const createPost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to create posts",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('forum_posts')
        .insert({
          user_id: user.id,
          title: newPost.title,
          content: newPost.content,
          is_anonymous: newPost.is_anonymous
        });

      if (error) throw error;

      toast({
        title: "Post submitted!",
        description: "Your post is awaiting moderation approval"
      });

      setNewPost({ title: "", content: "", is_anonymous: true });
      setShowCreateForm(false);

    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createReply = async () => {
    if (!newReply.content.trim() || !selectedPost) {
      toast({
        title: "Please write a reply",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to reply",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('forum_replies')
        .insert({
          post_id: selectedPost.id,
          user_id: user.id,
          content: newReply.content,
          is_anonymous: newReply.is_anonymous
        });

      if (error) throw error;

      toast({
        title: "Reply submitted!",
        description: "Your reply is awaiting moderation approval"
      });

      setNewReply({ content: "", is_anonymous: true });

    } catch (error) {
      console.error('Error creating reply:', error);
      toast({
        title: "Error",
        description: "Failed to create reply",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const openPost = (post: any) => {
    setSelectedPost(post);
    fetchReplies(post.id);
  };

  const closePost = () => {
    setSelectedPost(null);
    setReplies([]);
  };

  return (
    <div className="space-y-6">
      {/* Forum Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Anonymous Peer Support Forum
          </CardTitle>
          <CardDescription className="text-blue-800">
            A safe, moderated space to share experiences and support each other anonymously.
            All posts are reviewed before being published.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <MessageSquare className="h-4 w-4" />
              {posts.length} active discussions
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Community Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-1">✅ Be Supportive</h4>
              <p className="text-green-800">Offer encouragement and understanding to your peers</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">✅ Stay Anonymous</h4>
              <p className="text-blue-800">Protect your privacy and respect others' anonymity</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-1">⚠️ No Personal Info</h4>
              <p className="text-yellow-800">Don't share names, schools, or identifying details</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <h4 className="font-medium text-red-900 mb-1">❌ No Harmful Content</h4>
              <p className="text-red-800">Bullying, harassment, or harmful advice is not allowed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Post Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>
              Share your thoughts or ask for support from the community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Title *
              </label>
              <Input
                placeholder="e.g., Feeling overwhelmed with school, Tips for managing anxiety..."
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message *
              </label>
              <Textarea
                placeholder="Share your thoughts, experiences, or ask for advice. Remember to keep it anonymous and supportive."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="min-h-[120px]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="anonymous"
                  checked={newPost.is_anonymous}
                  onCheckedChange={(checked) => setNewPost({ ...newPost, is_anonymous: checked })}
                />
                <label htmlFor="anonymous" className="text-sm font-medium text-gray-700">
                  Post anonymously (recommended)
                </label>
              </div>

              <div className="flex gap-2">
                <Button onClick={createPost} disabled={loading}>
                  {loading ? "Submitting..." : "Submit for Review"}
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Post Detail View */}
      {selectedPost && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{selectedPost.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">
                    {selectedPost.is_anonymous ? "Anonymous" : "Public"}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {new Date(selectedPost.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Button variant="ghost" onClick={closePost}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
            </div>

            {/* Replies Section */}
            <div className="border-t pt-6">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Reply className="h-4 w-4" />
                Replies ({replies.length})
              </h4>

              {/* Reply Form */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <Textarea
                  placeholder="Share your thoughts or offer support..."
                  value={newReply.content}
                  onChange={(e) => setNewReply({ ...newReply, content: e.target.value })}
                  className="mb-3"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="reply-anonymous"
                      checked={newReply.is_anonymous}
                      onCheckedChange={(checked) => setNewReply({ ...newReply, is_anonymous: checked })}
                    />
                    <label htmlFor="reply-anonymous" className="text-sm font-medium text-gray-700">
                      Reply anonymously
                    </label>
                  </div>
                  <Button size="sm" onClick={createReply} disabled={loading}>
                    {loading ? "Submitting..." : "Reply"}
                  </Button>
                </div>
              </div>

              {/* Replies List */}
              <div className="space-y-4">
                {replies.map((reply) => (
                  <div key={reply.id} className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {reply.is_anonymous ? "Anonymous" : "Public"}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(reply.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm whitespace-pre-wrap">{reply.content}</p>
                  </div>
                ))}
                {replies.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No replies yet. Be the first to offer support!
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      {!selectedPost && (
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6" onClick={() => openPost(post)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          {post.is_anonymous ? "Anonymous" : "Public"}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Reply className="h-3 w-3" />
                          Click to view & reply
                        </span>
                      </div>
                    </div>
                    <MessageSquare className="h-5 w-5 text-gray-400 ml-4" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600 mb-4">
                  Be the first to start a conversation in our supportive community
                </p>
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Post
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default AnonymousForum;
