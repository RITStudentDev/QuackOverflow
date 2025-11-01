from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CustomUser
from .serializers import CustomUserSerializer, UserSignupSerializer
from rest_framework_simplejwt.views import ( TokenObtainPairView, TokenRefreshView )

# custom class to generate and store JWT tokens in cookies
class CustomTokenObtainPairView(TokenObtainPairView):
    def post (self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()
            res.data = {"tokenGenerated": True}
            # stores access token in cookie
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
            )
            # stores refresh token in cookie
            res.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
            )
            return res
        except:
            return Response({'tokenGenerated':False})
        
# custom class to refresh JWT tokens
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)
            tokens = response.data
            access_token = tokens['access']

            res = Response()
            res.data = {"tokenGenerated": True}
            # stores access token in cookie after refresh
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
            )
            return res
        except:
            return Response({'tokenGenerated':False})

# create new user on signup
@api_view(['POST'])
def create_user(request):
    serializer = UserSignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User created successfully!'}, status=201)
    return Response(serializer.errors, status=400)


# retrieve user data from user model in database
@api_view(['GET'])
def get_user_data(request, pk):
    try:
        try:
            user = CustomUser.objects.get(username=pk)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    except:
        return Response({'error':'error retrieving data'}, status=500)

