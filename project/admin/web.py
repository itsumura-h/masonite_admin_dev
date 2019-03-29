from masonite.routes import Get, Post, Patch, Delete
from .resources import AdminController, AdminResource

from api.resources import Resource
from api.serializers import JSONSerializer
from app.User import User
from app.models.Post import Post
import pprint


# class UserResource(Resource, JSONSerializer):
#     model = User

# class PostResource(Resource, JSONSerializer):
#     model = Post

#pprint.pprint(AdminResource(Post, 'posts').routes())

ADMIN_ROUTES = [
    Get().route('/', AdminController.root),
    Get().route('/api/tables',AdminController.tables),
    AdminResource(User, 'users', without=['password']).routes(),
    #AdminResource(Post, 'posts').routes(),
    Get().route('/@table', AdminController.root),
    Get().route('/@table/@id/edit', AdminController.root),
    Get().route('/@table/@id', AdminController.root),
    
    
    #UserResource('/api/users').routes(),
    #PostResource('/api/posts').routes(),
]


#pprint.pprint(ADMIN_ROUTES)