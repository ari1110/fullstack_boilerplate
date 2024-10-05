import graphene
from graphene_django import DjangoObjectType
from .models import Profile
from django.contrib.auth.models import User

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class ProfileType(DjangoObjectType):
    class Meta:
        model = Profile

class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    profiles = graphene.List(ProfileType)

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_profiles(self, info):
        return Profile.objects.all()

schema = graphene.Schema(query=Query)